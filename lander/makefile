.PHONY: docker-build sync-webui-image reload-stack deploy-webui


docker-build:
		docker build -t chrysg.com/lander .

sync-webui-image:
		docker save chrysg.com/lander:latest | ssh rnvps -C 'docker load'

reload-stack:
		ssh -C rnvps 'docker compose -f /home/ops/configs/chrysg.com/compose.yaml up --force-recreate -t 0 -d'

deploy-webui: docker-build sync-webui-image reload-stack