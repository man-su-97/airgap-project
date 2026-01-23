========================================================
 AIR-GAPPED KUBERNETES DEPLOYMENT INSTRUCTIONS
========================================================

This package contains a fully air-gapped deployment bundle
for a Next.js + NestJS application using Docker and Kubernetes.

This deployment is fully automated using the included
PowerShell script (deploy.ps1).

--------------------------------------------------------
 SYSTEM REQUIREMENTS
--------------------------------------------------------

- Windows 10/11
- Docker Desktop with Kubernetes enabled
- kubectl available in PATH
- Internet access NOT required

--------------------------------------------------------
 PACKAGE CONTENTS
--------------------------------------------------------

- backend.tar        → Backend Docker image
- frontend.tar       → Frontend Docker image
- k8s/               → Kubernetes manifests
- deploy.ps1         → Automated deployment script
- README.txt         → This documentation

--------------------------------------------------------
 STEP 1 — EXTRACT DEPLOYMENT BUNDLE
--------------------------------------------------------

tar -xzf airgap-release-bundle-*.tar.gz
cd airgap-release

--------------------------------------------------------
 STEP 2 — RUN DEPLOYMENT SCRIPT
--------------------------------------------------------

Open PowerShell and run:

.\deploy.ps1

NOTE:
If script execution is blocked, run:

Set-ExecutionPolicy RemoteSigned -Scope CurrentUser

Then rerun deploy.ps1

--------------------------------------------------------
 WHAT THE SCRIPT DOES AUTOMATICALLY
--------------------------------------------------------

- Validates Docker and Kubernetes availability
- Loads backend and frontend Docker images
- Starts local container registry if required
- Pushes images to local registry (localhost:5000)
- Deploys Kubernetes manifests
- Displays deployment status

--------------------------------------------------------
 STEP 3 — VERIFY DEPLOYMENT
--------------------------------------------------------

kubectl get pods
kubectl get svc

Ensure both frontend and backend pods show:

STATUS: Running

--------------------------------------------------------
 STEP 4 — OPEN APPLICATION
--------------------------------------------------------

Get frontend NodePort:

kubectl get svc frontend

Example:

frontend   NodePort   ...   3000:30080/TCP

Open in browser:

http://localhost:30080

--------------------------------------------------------
 STEP 5 — BACKEND API TEST (OPTIONAL)
--------------------------------------------------------

kubectl port-forward svc/backend 4000:4000

Open:

http://localhost:4000

Stop forwarding using CTRL + C

--------------------------------------------------------
 TROUBLESHOOTING
--------------------------------------------------------

View pod logs:

kubectl logs deploy/backend
kubectl logs deploy/frontend

Restart deployment:

kubectl delete -f k8s/
kubectl apply -f k8s/

--------------------------------------------------------
 SUPPORT
--------------------------------------------------------

Contact DevOps / Engineering Team

========================================================
