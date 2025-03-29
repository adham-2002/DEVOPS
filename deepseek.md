I'll help you modify your Jenkins pipeline to include all Week 2 requirements. Here's the enhanced version with explanations:

```groovy
pipeline {
  agent any
  environment {
    GITHUB_TOKEN = credentials('githubToken')
    REPO_URL = 'https://github.com/adham-2002/DEVOPS.git'
    SLACK_CHANNEL = '#your-slack-channel'
    SLACK_CREDENTIALS_ID = 'slack-webhook'
  }
  
  stages {
    // Existing stages remain the same until the new test stage
    
    stage('Checkout Code') {
      steps {
        git branch: 'main', url: env.REPO_URL, credentialsId: 'githubToken'
      }
    }

    // New automated testing stage
    stage('Run Unit Tests') {
      steps {
        sh '''
        docker build -t app-image -f Dockerfile .
        docker run --rm app-image npm test # Replace with your test command
        '''
      }
    }

    // Existing stages (Install Docker Compose, Infra Validation, Cleanup, Start Containers)
    // ... [keep your existing stages here] ...

    // New stage to push Docker image (optional)
    stage('Push Docker Image') {
      steps {
        script {
          withCredentials([usernamePassword(credentialsId: 'dockerhub-creds', passwordVariable: 'DOCKER_PASS', usernameVariable: 'DOCKER_USER')]) {
            sh 'docker login -u $DOCKER_USER -p $DOCKER_PASS'
            sh 'docker tag app-image $DOCKER_USER/my-app:latest'
            sh 'docker push $DOCKER_USER/my-app:latest'
          }
        }
      }
    }
  }
  
  post {
    success {
      slackSend(
        channel: env.SLACK_CHANNEL,
        color: 'good',
        message: "SUCCESS: Pipeline ${env.JOB_NAME} #${env.BUILD_NUMBER}",
        tokenCredentialId: env.SLACK_CREDENTIALS_ID
      )
      mail to: 'team@example.com',
           subject: "SUCCESS: Pipeline '${env.JOB_NAME}'",
           body: "Build ${env.BUILD_NUMBER} completed successfully"
    }
    failure {
      slackSend(
        channel: env.SLACK_CHANNEL,
        color: 'danger',
        message: "FAILED: Pipeline ${env.JOB_NAME} #${env.BUILD_NUMBER}",
        tokenCredentialId: env.SLACK_CREDENTIALS_ID
      )
      mail to: 'team@example.com',
           subject: "FAILED: Pipeline '${env.JOB_NAME}'",
           body: "Build ${env.BUILD_NUMBER} failed. See ${env.BUILD_URL}"
    }
    always {
      sh 'docker compose logs --no-color > docker-logs.txt'
      archiveArtifacts artifacts: 'docker-logs.txt', fingerprint: true
      junit '**/test-results.xml' // For test results reporting
      cleanWs()
    }
  }
  
  // Trigger configuration
  triggers {
    GitHubPushTrigger {
      adminList: []
      triggerOnPush: true
      cron: ''
    }
  }
}
```

**Implementation Steps:**

1. **Automated Testing:**
   - Create a `tests` directory with unit tests
   - Add test command in Dockerfile (e.g., `npm test`, `pytest`, etc.)
   - Example test command in Dockerfile:
     ```dockerfile
     CMD ["npm", "test"]
     ```

2. **Slack Notifications:**
   - Install Slack Notification plugin
   - Configure Slack webhook:
     1. Create Slack app at api.slack.com
     2. Add "Incoming Webhooks"
     3. Add webhook URL as credential in Jenkins (ID: slack-webhook)

3. **Email Notifications:**
   - Configure SMTP in Jenkins:
     - Manage Jenkins > System > Email Notification
     - Set SMTP server and credentials

4. **Git Trigger:**
   - Install GitHub plugin
   - Add webhook in GitHub repository:
     - Payload URL: `https://jenkins-url/github-webhook/`
     - Content type: application/json

5. **Docker Build Optimization:**
   - Create proper Dockerfile with build arguments
   - Consider multi-stage builds
   - Add .dockerignore file

6. **Security Improvements:**
   - Remove `chmod 666 /var/run/docker.sock` (use docker group instead)
   - Add cleanup stage:
     ```groovy
     stage('Cleanup') {
       steps {
         sh 'docker system prune -f'
       }
     }
     ```

**Ansible Playbook Enhancement:**  
Add verification for test results in your playbook:

```yaml
- name: Verify Tests
  hosts: local_servers
  tasks:
    - name: Check test results
      stat:
        path: /path/to/test-results.xml
      register: test_results

    - name: Fail if tests not found
      fail:
        msg: "No test results found!"
      when: not test_results.stat.exists
```

**To Complete Setup:**

1. Install required Jenkins plugins:
   - Slack Notification
   - GitHub
   - Docker Pipeline
   - Email Extension

2. Add credentials in Jenkins:
   - GitHub token
   - Docker Hub credentials
   - Slack webhook URL

3. Configure Jenkins to expose webhook endpoint (port forwarding/nginx if needed)

This implementation provides full CI/CD with testing and notifications. Let me know if you need clarification on any part!