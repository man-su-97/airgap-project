param (
  [string]$BundlePath
)

if (-not $BundlePath) {
  Write-Host "Usage: ./deploy-airgap.ps1 <bundle.tar.gz>"
  exit 1
}

Write-Host "Extracting bundle..."
tar -xzf $BundlePath

cd release

Write-Host "Loading backend image..."
docker load -i backend.tar
docker tag airgap-backend:* localhost:5000/airgap-backend:latest
docker push localhost:5000/airgap-backend:latest

Write-Host "Loading frontend image..."
docker load -i frontend.tar
docker tag airgap-frontend:* localhost:5000/airgap-frontend:latest
docker push localhost:5000/airgap-frontend:latest

Write-Host "Deploying to Kubernetes..."
kubectl apply -f k8s/

Write-Host "Deployment started. Watching rollout..."

kubectl rollout status deployment/backend
kubectl rollout status deployment/frontend

Write-Host "Deployment complete"
