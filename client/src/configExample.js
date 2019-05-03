export default {
    cognito: {
      REGION: "AWS_POOL_REGION",
      USER_POOL_ID: "AWS_USER_POOL_ID",
      APP_CLIENT_ID: "AWS_CLIENT_ID"
    },

    TOKEN: localStorage.getItem(`CognitoIdentityServiceProvider.AWS_CLIENT_ID.${localStorage.getItem(`CognitoIdentityServiceProvider.AWS_CLIENT_ID.LastAuthUser`)}.accessToken`),

    HOSTNAME: "http://ec2-3-16-45-90.us-east-2.compute.amazonaws.com:8080/graphql",
};



