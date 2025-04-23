# Code Execution Platform

**Private version is available in Rust — contact me for collaboration**  
[praveen-mathi.vercel.app](https://praveen-mathi.vercel.app/)


A secure, containerized code execution platform supporting multiple programming languages (JavaScript, Python, Java, C++).

## Features

- 🔒 Secure code execution in isolated Docker containers
- 🚀 Support for multiple programming languages
- ⚡ Real-time code editing with syntax highlighting
- 🎯 Resource limits and timeouts
- 📝 Comprehensive logging

## Prerequisites

- Node.js (v16 or higher)
- Docker
- Git

## Project Structure

```
.
├── backend/                # Backend server
│   ├── src/
│   │   ├── config/        # Configuration files
│   │   ├── controllers/   # Request handlers
│   │   ├── middleware/    # Express middleware
│   │   ├── routes/       # API routes
│   │   ├── services/     # Business logic
│   │   └── utils/        # Utility functions
│   └── ...
└── frontend/             # React frontend
    ├── src/
    │   ├── components/   # React components
    │   └── ...
    └── ...
```

## Setup Instructions

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```bash
cp .env.example .env
```

4. Pull required Docker images:
```bash
docker pull python:3.9-slim
docker pull node:16-slim
docker pull openjdk:11-slim
docker pull gcc:latest
```
<!-- 

docker pull python:3.9-slim
docker pull node:16-slim
docker pull openjdk:11-slim
docker pull gcc:latest -->

5. Start the backend server:
```bash
# Development mode
npm run dev

# Production mode
npm start
```

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```bash
cp .env.example .env
```

4. Start the development server:
```bash
npm run dev
```

## Environment Variables

### Backend (.env.example)

```env
# Server Configuration
PORT=3000
NODE_ENV=development

# Docker Configuration
MAX_MEMORY=100m
DOCKER_CPU_LIMIT=0.5
MAX_EXECUTION_TIME=10000

# Logging
LOG_LEVEL=info
```

### Frontend (.env.example)

```env
VITE_API_URL=http://localhost:3000/api
```

## Testing the Platform

1. Open your browser and navigate to `http://localhost:5173`
2. Select a programming language
3. Write or paste your code
4. Click "Run Code"

### Sample Code Snippets

JavaScript:
```javascript
console.log('Hello, World!');
const sum = (a, b) => a + b;
console.log(sum(5, 3));
```

Python:
```python
def factorial(n):
    return 1 if n <= 1 else n * factorial(n-1)
print(factorial(5))
```

Java:
```java
public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}
```

C++:
```cpp
#include <iostream>
int main() {
    std::cout << "Hello, World!" << std::endl;
    return 0;
}
```

## Security Measures

1. Docker Container Isolation:
   - Memory limit: 100MB per container
   - CPU limit: 0.5 cores
   - Network access: Disabled
   - Automatic cleanup

2. Code Execution:
   - Timeouts for each language
   - Resource monitoring
   - Error handling

3. API Security:
   - Input validation
   - Error handling
   - Rate limiting (TODO)

## Troubleshooting

1. Docker Issues:
   - Ensure Docker daemon is running
   - Check Docker permissions
   - Verify required images are pulled

2. Backend Issues:
   - Check logs in `error.log` and `combined.log`
   - Verify environment variables
   - Ensure ports are not in use

3. Frontend Issues:
   - Check console for errors
   - Verify API URL in environment variables
   - Clear browser cache if needed
