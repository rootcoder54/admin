module.exports = {
    apps: [
      {
        name: "next-app",
        script: "npm",
        args: "run start",
        env: {
          NODE_ENV: "production",
        },
      },
    ],
  };
  