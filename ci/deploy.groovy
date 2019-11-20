// Test comment
pipeline {
  agent { node { label 'Node' } }
  tools { nodejs "10.16.3" }

  stages {
    stage('Run the deploy script') {
      steps {
        echo "payload: ${params.payload}"
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

