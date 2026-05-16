const config = {
  plugins: {
    "postcss-import": {
      filter: (path) => {
        // Skip Tailwind CSS v4 directive - handled by @tailwindcss/postcss
        if (path === "tailwindcss") return false;
        return true;
      },
    },
    "@tailwindcss/postcss": {},
  },
};

export default config;
