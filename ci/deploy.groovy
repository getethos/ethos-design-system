pipeline {
  agent { node { label 'Node' } }
  tools { nodejs "10.13.0" }

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

