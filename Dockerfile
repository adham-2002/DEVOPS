FROM jenkins/jenkins:lts

USER root
RUN apt-get update && apt-get install -y sudo

CMD ["/usr/bin/tini", "--", "/usr/local/bin/jenkins.sh"]
