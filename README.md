https://medium.com/@learn-simplified/genai-witness-automated-test-cases-generation-in-action-lets-build-ebc7f5ce0afb
https://github.com/Strvm/meta-ai-api
https://www.codechef.com/roadmap/data-structures-and-algorithms
https://www.codechef.com/roadmap/java-dsa


https://piyushteam.lab.neuralcompany.team/member-registration?token=ZfQEeeNgGDGguaLZiYmhtPgqYvFBWcDNWAD
 
{

    "workspace": "piyushteam.lab.neuralcompany.team",

    "token": "ZfQEeeNgGDGguaLZiYmhtPgqYvFBWcDNWAD",

    "name": "chitransh",

    "contact": "+91 42547-56768",

    "password": "Test@123",

    "confirmPassword": "Test@123"

}
 
https://stacklabs.lab.neuralcompany.team/api/auth/v1/memberregistration
 https://stacklabs.lab.neuralcompany.team/register/get-started ------ url 
 import { check, sleep, group } from 'k6';
import http from 'k6/http';

export let options = {
  stages: [
    { duration: '10s', target: 50 },  // Ramp-up to 50 VUs over 10s
    { duration: '10s', target: 100 }, // Ramp-up to 100 VUs over 10s
    { duration: '10s', target: 0 },   // Ramp-down to 0 VUs over 10s
  ],
};

const BASE_URL = 'https://stacklabs.lab.neuralcompany.team/api/auth/v1/login';

export function handleSummary(data) {
  return {
    'summary.json': JSON.stringify(data),
  };
}

const loginPayload = JSON.stringify({
  "email": "ankita.singh@xenonstack.com",
  "password": "Data@123",
  "workspace": "data.lab.neuralcompany.team"
});

const params = {
  headers: {
    'Content-Type': 'application/json'
  }
};

export default function () {
  group('Login', () => {
    let loginRes = http.post(BASE_URL, loginPayload, params);
    console.log('Login response:', JSON.stringify(loginRes.body));
    let token = loginRes.json('token');
    let userId = loginRes.json('userid');
    let workspaceName = loginRes.json('workspace_name');
    let workspaceRole = loginRes.json('workspace_role');
    console.log('Token:', token);
    console.log('UserID:', userId);
    console.log('Workspace Name:', workspaceName);
    console.log('Workspace Role:', workspaceRole);
    check(loginRes, { 
      'status is 200': (r) => r.status === 200,
      'token is present': (r) => r.json('token') !== '',  
      'expire is valid': (r) => Date.parse(r.json('expire')) > Date.now(),  
      'role is correct': (r) => r.json('role_id') === 'user',
    });
    if (token && userId && workspaceName && workspaceRole) {
      console.log(`Login successful:
        Token: ${token}
        UserID: ${userId}
        Workspace Name: ${workspaceName}
        Workspace Role: ${workspaceRole}`);

      const authenticatedUrl = 'https://stacklabs.lab.neuralcompany.team/api/auth/v1/memberregistration';
      const authHeaders = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      };

      let authApiRes = http.get(authenticatedUrl, { headers: authHeaders });

      check(authApiRes, {
        'logout status is 200': (r) => r.status === 200,
      });
    } else {
      
      console.error('Token or user details are missing in the response');
    }
  });
  sleep(1);
}
----------------------
import { check, sleep, group } from 'k6';
import http from 'k6/http';
import { SharedArray } from 'k6/data'; 


const payloadData = new SharedArray('Payload Data', function () {
  // Adjust the path to your JSON file
  return JSON.parse(open('payload.json')); // Load the JSON file containing user data
});

export let options = {
  stages: [
    { duration: '10s', target: 50 },  // Ramp-up to 50 VUs over 10s
    { duration: '10s', target: 100 }, // Ramp-up to 100 VUs over 10s
    { duration: '10s', target: 0 },   // Ramp-down to 0 VUs over 10s
  ],
};

const BASE_URL = 'https://piyushteam.lab.neuralcompany.team/member-registration?token=ZfQEeeNgGDGguaLZiYmhtPgqYvFBWcDNWAD';
const MEMBER_REGISTRATION_URL = 'https://stacklabs.lab.neuralcompany.team/api/auth/v1/memberregistration';

export function handleSummary(data) {
  return {
    'summary.json': JSON.stringify(data),
  };
}

export default function () {
  payloadData.forEach((data) => {
    group('Member Registration and Login', () => {
      // Registration Payload
      let registrationPayload = JSON.stringify({
        "workspace": "piyushteam.lab.neuralcompany.team",
        "token": "ZfQEeeNgGDGguaLZiYmhtPgqYvFBWcDNWAD",
        "name": data.name,
        "contact": data.contact,
        "password": data.password,
        "confirmPassword": data.password, 
      });

      const params = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      // Sending the registration request
      let registrationRes = http.post(MEMBER_REGISTRATION_URL, registrationPayload, params);
      console.log('Registration response:', JSON.stringify(registrationRes.body));

      // Validate the registration response
      check(registrationRes, {
        'status is 200': (r) => r.status === 200,
        'response contains success': (r) => r.body.includes('success'),
      });

  

     

      let token = loginRes.json('token');
      let userId = loginRes.json('userid');
      let workspaceName = loginRes.json('workspace_name');
      let workspaceRole = loginRes.json('workspace_role');
      console.log('Token:', token);
      console.log('UserID:', userId);
      console.log('Workspace Name:', workspaceName);
      console.log('Workspace Role:', workspaceRole);

      check(loginRes, {
        'status is 200': (r) => r.status === 200,
        'token is present': (r) => r.json('token') !== '',
        'expire is valid': (r) => Date.parse(r.json('expire')) > Date.now(),
        'role is correct': (r) => r.json('role_id') === 'user',
      });

      // Logout after successful login
      if (token) {
        const authenticatedUrl = 'https://stacklabs.lab.neuralcompany.team/api/auth/v1/logout';
        const authHeaders = {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        };

        let authApiRes = http.get(authenticatedUrl, { headers: authHeaders });

        check(authApiRes, {
          'logout status is 200': (r) => r.status === 200,
        });
      } else {
        console.error('Token or user details are missing in the response');
      }
    });
  });

  sleep(1); // Sleep between requests
}
----------------------------------------------------
[
    {
      "workspace": "piyushteam.lab.neuralcompany.team",
      "token": "ZfQEeeNgGDGguaLZiYmhtPgqYvFBWcDNWAD",
      "name": "John Doe",
      "contact": "+91 911234567890",
      "password": "Test@123",
      "confirmPassword": "Test@123"
    },
    {
      "workspace": "piyushteam.lab.neuralcompany.team",
      "token": "ZfQEeeNgGDGguaLZiYmhtPgqYvFBWcDNWAD",
      "name": "Jane Smith",
      "contact": "+91 912345678901",
      "password": "SecurePass1!",
      "confirmPassword": "SecurePass1!"
    },
    {
      "workspace": "piyushteam.lab.neuralcompany.team",
      "token": "ZfQEeeNgGDGguaLZiYmhtPgqYvFBWcDNWAD",
      "name": "Michael Brown",
      "contact": "+91 913456789012",
      "password": "Password123!",
      "confirmPassword": "Password123!"
    },
    {
      "workspace": "piyushteam.lab.neuralcompany.team",
      "token": "ZfQEeeNgGDGguaLZiYmhtPgqYvFBWcDNWAD",
      "name": "Sophia Johnson",
      "contact": "+91 914567890123",
      "password": "MysuperPass1!",
      "confirmPassword": "MysuperPass1!"
    },
    {
      "workspace": "piyushteam.lab.neuralcompany.team",
      "token": "ZfQEeeNgGDGguaLZiYmhtPgqYvFBWcDNWAD",
      "name": "William Lee",
      "contact": "+91 915678901234",
      "password": "Welcome123!",
      "confirmPassword": "Welcome123!"
    },
    {
      "workspace": "piyushteam.lab.neuralcompany.team",
      "token": "ZfQEeeNgGDGguaLZiYmhtPgqYvFBWcDNWAD",
      "name": "Olivia Kim",
      "contact": "+91 916789012345",
      "password": "Passw0rd!1",
      "confirmPassword": "Passw0rd!1"
    },
    {
      "workspace": "piyushteam.lab.neuralcompany.team",
      "token": "ZfQEeeNgGDGguaLZiYmhtPgqYvFBWcDNWAD",
      "name": "Benjamin Clark",
      "contact": "+91 917890123456",
      "password": "StrongPass#2",
      "confirmPassword": "StrongPass#2"
    },
    {
      "workspace": "piyushteam.lab.neuralcompany.team",
      "token": "ZfQEeeNgGDGguaLZiYmhtPgqYvFBWcDNWAD",
      "name": "Amelia Davis",
      "contact": "+91 918901234567",
      "password": "Amelia@2024",
      "confirmPassword": "Amelia@2024"
    },
    {
      "workspace": "piyushteam.lab.neuralcompany.team",
      "token": "ZfQEeeNgGDGguaLZiYmhtPgqYvFBWcDNWAD",
      "name": "Elijah Martinez",
      "contact": "+91 919012345678",
      "password": "Elijah#2024",
      "confirmPassword": "Elijah#2024"
    },
    {
      "workspace": "piyushteam.lab.neuralcompany.team",
      "token": "ZfQEeeNgGDGguaLZiYmhtPgqYvFBWcDNWAD",
      "name": "Mia Robinson",
      "contact": "+91 920123456789",
      "password": "MiaPass123!",
      "confirmPassword": "MiaPass123!"
    },
    {
      "workspace": "piyushteam.lab.neuralcompany.team",
      "token": "ZfQEeeNgGDGguaLZiYmhtPgqYvFBWcDNWAD",
      "name": "Alexander Lewis",
      "contact": "+91 921234567890",
      "password": "AlexSecure#1",
      "confirmPassword": "AlexSecure#1"
    },
    {
      "workspace": "piyushteam.lab.neuralcompany.team",
      "token": "ZfQEeeNgGDGguaLZiYmhtPgqYvFBWcDNWAD",
      "name": "Isabella Walker",
      "contact": "+91 922345678901",
      "password": "Isabella@2024",
      "confirmPassword": "Isabella@2024"
    },
    {
      "workspace": "piyushteam.lab.neuralcompany.team",
      "token": "ZfQEeeNgGDGguaLZiYmhtPgqYvFBWcDNWAD",
      "name": "Lucas Hill",
      "contact": "+91 923456789012",
      "password": "LucasPassword1!",
      "confirmPassword": "LucasPassword1!"
    },
    {
      "workspace": "piyushteam.lab.neuralcompany.team",
      "token": "ZfQEeeNgGDGguaLZiYmhtPgqYvFBWcDNWAD",
      "name": "Evelyn Scott",
      "contact": "+91 924567890123",
      "password": "Evelyn@123",
      "confirmPassword": "Evelyn@123"
    },
    {
      "workspace": "piyushteam.lab.neuralcompany.team",
      "token": "ZfQEeeNgGDGguaLZiYmhtPgqYvFBWcDNWAD",
      "name": "Jack Harris",
      "contact": "+91 925678901234",
      "password": "JackPassw0rd!",
      "confirmPassword": "JackPassw0rd!"
    },
    {
      "workspace": "piyushteam.lab.neuralcompany.team",
      "token": "ZfQEeeNgGDGguaLZiYmhtPgqYvFBWcDNWAD",
      "name": "Charlotte Young",
      "contact": "+91 926789012345",
      "password": "Charlotte#1",
      "confirmPassword": "Charlotte#1"
    },
    {
      "workspace": "piyushteam.lab.neuralcompany.team",
      "token": "ZfQEeeNgGDGguaLZiYmhtPgqYvFBWcDNWAD",
      "name": "Aiden King",
      "contact": "+91 927890123456",
      "password": "Aiden@2024",
      "confirmPassword": "Aiden@2024"
    },
    {
      "workspace": "piyushteam.lab.neuralcompany.team",
      "token": "ZfQEeeNgGDGguaLZiYmhtPgqYvFBWcDNWAD",
      "name": "Grace Allen",
      "contact": "+91 928901234567",
      "password": "GracePass!123",
      "confirmPassword": "GracePass!123"
    },
    {
      "workspace": "piyushteam.lab.neuralcompany.team",
      "token": "ZfQEeeNgGDGguaLZiYmhtPgqYvFBWcDNWAD",
      "name": "Mason Wright",
      "contact": "+91 929012345678",
      "password": "MasonPass#123",
      "confirmPassword": "MasonPass#123"
    },
    {
      "workspace": "piyushteam.lab.neuralcompany.team",
      "token": "ZfQEeeNgGDGguaLZiYmhtPgqYvFBWcDNWAD",
      "name": "Lily Baker",
      "contact": "+91 930123456789",
      "password": "Lily123!",
      "confirmPassword": "Lily123!"
    },
    {
      "workspace": "piyushteam.lab.neuralcompany.team",
      "token": "ZfQEeeNgGDGguaLZiYmhtPgqYvFBWcDNWAD",
      "name": "James Lee",
      "contact": "+91 931234567890",
      "password": "JamesPass!2024",
      "confirmPassword": "JamesPass!2024"
    },
    {
      "workspace": "piyushteam.lab.neuralcompany.team",
      "token": "ZfQEeeNgGDGguaLZiYmhtPgqYvFBWcDNWAD",
      "name": "Zoe Turner",
      "contact": "+91 932345678901",
      "password": "ZoeSecure!2024",
      "confirmPassword": "ZoeSecure!2024"
    },
    {
      "workspace": "piyushteam.lab.neuralcompany.team",
      "token": "ZfQEeeNgGDGguaLZiYmhtPgqYvFBWcDNWAD",
      "name": "Samuel Green",
      "contact": "+91 933456789012",
      "password": "SamuelPass1!",
      "confirmPassword": "SamuelPass1!"
    },
    {
      "workspace": "piyushteam.lab.neuralcompany.team",
      "token": "ZfQEeeNgGDGguaLZiYmhtPgqYvFBWcDNWAD",
      "name": "Chloe Hall",
      "contact": "+91 934567890123",
      "password": "ChloePass!123",
      "confirmPassword": "ChloePass!123"
    },
    {
      "workspace": "piyushteam.lab.neuralcompany.team",
      "token": "ZfQEeeNgGDGguaLZiYmhtPgqYvFBWcDNWAD",
      "name": "Henry Allen",
      "contact": "+91 935678901234",
      "password": "HenrySecure!2024",
      "confirmPassword": "HenrySecure!2024"
    },
    {
      "workspace": "piyushteam.lab.neuralcompany.team",
      "token": "ZfQEeeNgGDGguaLZiYmhtPgqYvFBWcDNWAD",
      "name": "Harper Adams",
      "contact": "+91 936789012345",
      "password": "HarperPass1!",
      "confirmPassword": "HarperPass1!"
    }
  ]
  
