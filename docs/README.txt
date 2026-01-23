========================================================
 AIR-GAPPED KUBERNETES DEPLOYMENT INSTRUCTIONS
========================================================

This package contains a fully air-gapped deployment bundle
for a Next.js + NestJS application using Docker and Kubernetes.


--------------------------------------------------------
 STEP 1 — EXTRACT DEPLOYMENT BUNDLE
--------------------------------------------------------

tar -xzf airgap-release-bundle.tar.gz
cd airgap-release

--------------------------------------------------------
 STEP 2 — START LOCAL CONTAINER REGISTRY
--------------------------------------------------------

docker run -d -p 5000:5000 --restart always --name local-registry registry:2

Verify:

docker ps | findstr registry

--------------------------------------------------------
 STEP 3 — LOAD DOCKER IMAGES
--------------------------------------------------------

docker load -i backend.tar
docker load -i frontend.tar

--------------------------------------------------------
 STEP 4 — TAG & PUSH IMAGES TO LOCAL REGISTRY
--------------------------------------------------------

docker tag airgap-backend:1.0 localhost:5000/airgap-backend:1.0
docker tag airgap-frontend:1.0 localhost:5000/airgap-frontend:1.0

docker push localhost:5000/airgap-backend:1.0
docker push localhost:5000/airgap-frontend:1.0

--------------------------------------------------------
 STEP 5 — DEPLOY KUBERNETES MANIFESTS
--------------------------------------------------------

kubectl apply -f k8s/backend/
kubectl apply -f k8s/frontend/

--------------------------------------------------------
 STEP 6 — VERIFY DEPLOYMENT
--------------------------------------------------------

kubectl get pods
kubectl get svc

Ensure both frontend and backend pods are in "Running" state.

--------------------------------------------------------
 STEP 7 — OPEN APPLICATION
--------------------------------------------------------

From service output, find frontend NodePort:

kubectl get svc frontend

Example output:
frontend   NodePort   ...   80:32418/TCP

Open in browser:

http://localhost:32418

--------------------------------------------------------
 STEP 8 — TEST BACKEND API (OPTIONAL)
--------------------------------------------------------

kubectl port-forward svc/backend 4000:4000

Open:

http://localhost:4000/analytics

Stop forwarding using CTRL + C

========================================================
