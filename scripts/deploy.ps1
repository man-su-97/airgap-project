$ErrorActionPreference = "Stop"

Write-Host "================ AIRGAP DEPLOYMENT START ================"



Write-Host "Checking Docker..."
docker info > $null 2>&1
if ($LASTEXITCODE -ne 0) {
    Write-Host "ERROR: Docker is not running." -ForegroundColor Red
    exit 1
}

Write-Host "Checking kubectl..."
kubectl version --client > $null 2>&1
if ($LASTEXITCODE -ne 0) {
    Write-Host "ERROR: kubectl not found." -ForegroundColor Red
    exit 1
}

Write-Host "Checking local registry..."
docker ps | findstr registry > $null
if ($LASTEXITCODE -ne 0) {
    Write-Host "ERROR: Local registry not running on localhost:5000" -ForegroundColor Red
    exit 1
}



Write-Host "Loading backend image..."
docker load -i backend.tar

Write-Host "Loading frontend image..."
docker load -i frontend.tar



$backendImage = docker images --format "{{.Repository}}:{{.Tag}}" | findstr airgap-backend | Select-Object -First 1
$frontendImage = docker images --format "{{.Repository}}:{{.Tag}}" | findstr airgap-frontend | Select-Object -First 1

if (-not $backendImage -or -not $frontendImage) {
    Write-Host "ERROR: Images not found after load." -ForegroundColor Red
    exit 1
}

Write-Host "Detected backend image: $backendImage"
Write-Host "Detected frontend image: $frontendImage"



docker tag $backendImage localhost:5000/airgap-backend:latest
docker tag $frontendImage localhost:5000/airgap-frontend:latest



Write-Host "Pushing images to local registry..."
docker push localhost:5000/airgap-backend:latest
docker push localhost:5000/airgap-frontend:latest



Write-Host "Deploying Kubernetes manifests..."
kubectl apply -f k8s/



Write-Host "Waiting for pods..."
kubectl get pods -A

Write-Host "Services:"
kubectl get svc -A

Write-Host "================ DEPLOYMENT COMPLETE ===================="
