pipeline {
  agent any
  environment {
    GITHUB_TOKEN = credentials('githubToken')
    REPO_URL = 'https://github.com/adham-2002/DEVOPS.git'
  }
  stages {
    stage('Checkout Code') {
      steps {
        git branch: 'main', url: REPO_URL, credentialsId: 'githubToken'
      }
    }

    stage('Install Docker Compose') {
      steps {
        sh '''
        if ! command -v docker-compose >/dev/null 2>&1 && ! docker compose version >/dev/null 2>&1; then
          echo "Installing Docker Compose..."
          sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
          sudo chmod +x /usr/local/bin/docker-compose
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
        sh 'docker-compose down --remove-orphans || true'
      }
    }

    stage('Start Containers') {
      steps {
        sh 'docker-compose up -d'
      }
    }
  }
}
