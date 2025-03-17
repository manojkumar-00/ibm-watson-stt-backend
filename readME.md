# IBM Speech to Text Node.js Project  

This project integrates with IBM Speech-to-Text APIs using a Node.js backend. It primarily demonstrates how streaming and WebSockets work with IBM STT APIs.  

## Setup Instructions  

### Prerequisites  
- Node.js installed on your machine  
- An IBM Cloud account with access to the IBM Speech-to-Text API and instance URL  
- Active internet connection  

### Installation  

1. **Clone the repository:**  
   ```sh
   git clone https://github.com/manojkumar-00/ibm-watson-stt-backend
   cd ibm-watson-stt-backend
   ```  

2. **Install dependencies:**  
   ```sh
   npm install
   ```  

3. **Create a `.env` file in the root directory** and add the following environment variables:  
   ```env
   PORT=your_custom_port_number
   INSTANCE_URL=your_instance_url
   API_KEY=your_stt_api_key

   Example:

   PORT=3000
   INSTANCE_URL=https://cloud.ibm.com/instance/01kdkfjkkdkdff/
   API_KEY=ksdfjkdfiee2343435r09fdifdf38893r
   ```  

4. **Start the server in production mode:**  
   ```sh
   npm start 
   ```  

5. **Start the server in development mode:**  
   ```sh
   npm run dev 
   ```  

### Accessing the Project  

1. Open a browser and go to `localhost:3000` to access the UI.  
2. The project also exposes multiple APIs, which you can check in the `routes` folder.  

### License  
This project is licensed under the MIT License.
