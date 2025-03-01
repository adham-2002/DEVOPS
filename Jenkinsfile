pipeline {
    agent any
    stages {
        stage('Checkout Code') {
            steps {
                git branch: 'main', url: 'https://github.com/adham-2002/DEVOPS'
            }
        }
        stage('Install Docker Compose if not installed') {
            steps {
                sh '''
                if ! command -v docker-compose &> /dev/null; then
                    echo "Docker Compose not found, installing..."
                    curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /tmp/docker-compose
                    chmod +x /tmp/docker-compose
                    echo "Docker Compose installed successfully"
                else
                    echo "Docker Compose is already installed"
                fi
                '''
            }
        }
        stage('Start Containers') {
            steps {
                sh '''
                docker-compose up -d
                '''
            }
        }
    }
}