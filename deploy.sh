docker build -t 0xelj/multi-client:latest -t 0xelj/multi-client:$SHA -f ./client/Dockerfile ./client
docker build -t 0xelj/multi-server:latest -t 0xelj/multi-server:$SHA -f ./server/Dockerfile ./server
docker build -t 0xelj/multi-worker:latest -t 0xelj/multi-worker:$SHA -f ./worker/Dockerfile ./worker

docker push 0xelj/multi-client:latest
docker push 0xelj/multi-server:latest
docker push 0xelj/multi-worker:latest

docker push 0xelj/multi-client:$SHA
docker push 0xelj/multi-server:$SHA
docker push 0xelj/multi-worker:$SHA

kubectl apply -f k8s
kubectl set image deployments/server-deployment server=0xelj/multi-server:$SHA
kubectl set image deployments/client-deployment client=0xelj/multi-client:$SHA
kubectl set image deployments/worker-deployment worker=0xelj/multi-worker:$SHA
