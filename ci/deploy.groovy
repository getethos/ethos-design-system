pipeline {
  agent { node { label 'Node' } }

  stages {
    stage('Run the deploy script') {
      steps {
        sh script: 'bin/deploy.sh'
      }
    }
  }

  post {
    always {
      cleanWs()
    }
  }
}

