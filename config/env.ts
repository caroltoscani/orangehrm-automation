export const ENV = {
  ORANGEHRM_USERNAME: process.env.ORANGEHRM_USERNAME ?? '',
  ORANGEHRM_PASSWORD: process.env.ORANGEHRM_PASSWORD ?? '',
};

function validateEnv() {
  if (!ENV.ORANGEHRM_USERNAME || !ENV.ORANGEHRM_PASSWORD) {
    throw new Error(
      'Missing environment variables: ORANGEHRM_USERNAME or ORANGEHRM_PASSWORD'
    );
  }
}

validateEnv();
