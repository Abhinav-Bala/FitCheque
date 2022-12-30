/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html" ,"./src/**/*.{jsx,js}"],
  theme: {
    fontSize: {
      'title': ['200px', {
        lineHeight: '200px',
      }],
      'heading': ['2rem', {
        lineHeight: '2.25rem',
        letterSpacing: '-0.02em',
        fontWeight: '300',
      }],
      'lobbyItem': ['30px', {
        lineHeight:'30px',
      }
      ],
      'lobbyCode': ['60px', {
        lineHeight: '60px',
      }
      ],
      'userList': ['25px', {
        lineHeight: '25px',
      }
      ],

    },
    extend: {
      fontFamily: {
        display: ["Chivo", "sans-serif"],
      },
    },
  },
  plugins: [],
}
