pipeline {
    agent any

    environment {
        // 서버 정보
        ip = "54.163.8.116"
        username = "ubuntu"

        // 스프링 서버 정보
        springname = "allwaysblog-fe"
        port = "3000"

        // 도커 정보
        imagename = "allwaysblog-fe-img"
        dockerCredential = 'docker-access-token'
        dockerImage = ''
        tagname = "dev"

        // 깃 정보
        giturl = 'https://github.com/KEA-Allways/AllwaysBlog-FE.git'
        gitCredential = "github-access-token"
        branchname = "prod"
    }

    stages {
        // git에서 repository clone
        stage('Prepare') {
            steps {
                echo 'Clonning Repository'
                git url: giturl,
                branch: branchname,
                credentialsId: gitCredential
            }
            post {
                success { 
                    echo 'Successfully Cloned Repository'
                }
                failure {
                    error 'This pipeline stops here...'
                }
            }
        }

        stage('F-build') {
            steps {
                dir(".") {
                    nodejs(nodeJSInstallationName: 'NodeJS 20.10.0') {
                        sh 'npm install --force && CI=false npm run build'
                    }
                }
            }
            post {
                success { 
                    echo 'Successfully Cloned Repository'
                }
                failure {
                    error 'This pipeline stops here...'
                }
            }
        }

        // docker build
        stage('Bulid Docker') {
            steps {
                echo 'Bulid Docker'
                script {
                    imagename = "jmk7117/${imagename}"
                    dockerImage = docker.build imagename
                }
            }
            post {
                failure {
                    error 'This pipeline stops here...'
                }
            }
        }

        // docker push
        stage('Push Docker') {
            steps {
                echo 'Push Docker'
                script {
                    docker.withRegistry( '', dockerCredential) {
                        dockerImage.push("${tagname}")
                    }
                }
            }
            post {
                failure {
                    error 'This pipeline stops here...'
                }
            }
        }

        // Run Container on Dev Server
        // stage('Run Container on Dev Server') {
        //     steps {
        //         echo 'Run Container on Dev Server'
                
        //         sshagent(['ec2-ssh']) {
        //             sh 'docker ps -f name=${springname} -q | xargs --no-run-if-empty docker container stop'
        //             sh 'docker container ls -a -fname=${springname} -q | xargs -r docker container rm'
        //             sh 'docker images --no-trunc --all --quiet --filter="dangling=true" | xargs --no-run-if-empty docker rmi'
        //             sh 'docker run -d -p 80:80 ${imagename}:${tagname} --name ${springname}'
        //         }
        //     }

        //     post {
        //         success {
        //             slackSend (
        //                 channel: '#jenkins',
        //                 colorized: true,
        //                 message: "SUCCESS: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]' (${env.BUILD_URL})"
        //             )
        //         }
        //         failure {
        //             slackSend (
        //                 channel: '#jenkins',
        //                 colorized: true,
        //                 message: "FAIL: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]' (${env.BUILD_URL})"
        //             )
        //         }
        //     }
        // }
    }
}
