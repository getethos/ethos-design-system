pipeline {
  agent { node { label 'Node' } }
  tools { nodejs "10.16.3" }

  stages {
    stage('Run the deploy script') {
      steps {
        sh 'printenv'
        sh 'bin/deploy.sh'
      }
    }
  }

  post {
    always {
      cleanWs()
    }
  }
}

