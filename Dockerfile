FROM jenkins/jenkins:lts

USER root

# تحديث النظام وتثبيت sudo و docker.io و openssh-client و Ansible
RUN apt-get update && \
    apt-get install -y sudo docker.io openssh-client ansible && \
    usermod -aG docker jenkins

# الرجوع لمستخدم jenkins
USER jenkins

# أمر التشغيل الأساسي
CMD ["/usr/bin/tini", "--", "/usr/local/bin/jenkins.sh"]
