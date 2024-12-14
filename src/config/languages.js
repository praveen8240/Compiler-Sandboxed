export const languageConfigs = {
  python: {
    image: 'python:3.9-slim',
    filename: 'main.py',
    command: 'python /code/main.py',
    timeout: 10000
  },
  javascript: {
    image: 'node:16-slim',
    filename: 'main.js',
    command: 'node /code/main.js',
    timeout: 10000
  },
  java: {
    image: 'openjdk:11-slim',
    filename: 'Main.java',
    command: 'javac /code/Main.java && java -cp /code Main',
    timeout: 15000
  },
  cpp: {
    image: 'gcc:latest',
    filename: 'main.cpp',
    command: 'g++ /code/main.cpp -o /code/main && /code/main',
    timeout: 10000
  }
};

export const getLanguageConfig = (language) => {
  return languageConfigs[language.toLowerCase()];
};