// sudo chmod 666 /var/run/docker.sock
pipeline {
  agent any
  environment {
    GITHUB_TOKEN = credentials('githubToken')
    REPO_URL = 'https://github.com/adham-2002/DEVOPS.git'
  }
  
  stages {
    
    stage('Checkout Code') {
      steps {
        git branch: 'main', url: env.REPO_URL, credentialsId: 'githubToken'
      }
    }

    stage('Install Docker Compose') {
      steps {
        sh '''
        if ! command -v docker compose >/dev/null 2>&1; then
          echo "Installing Docker Compose..."
          sudo curl -SL https://github.com/docker/compose/releases/download/v2.29.3/docker-compose-linux-x86_64 -o /usr/local/bin/docker-compose
          sudo chmod +x /usr/local/bin/docker-compose
          sudo ln -sf /usr/local/bin/docker-compose /usr/local/bin/docker
        fi
        '''
      }
    }

    stage('Infra Validation') {
      steps {
        sh '''
        cd ansible
        ansible-playbook -i inventories/local.ini playbook.yml
        '''
      }
    }

    stage('Cleanup Previous Containers') {
      steps {
        sh 'docker compose down --remove-orphans || true'
      }
    }

    stage('Start Containers') {
      steps {
        sh 'docker compose up -d --build'
      }
    }
  }
  // push docker images
  stage("Push Docker Images") {
    steps {
      script {
        
      }
    }
  }
  
  post {
    always {
      sh 'docker compose logs --no-color > docker-logs.txt'
      archiveArtifacts artifacts: 'docker-logs.txt', fingerprint: true
      cleanWs()
    }
  }
}
