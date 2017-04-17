import Head from 'next/head'

export default ({ title }) => (
  <Head>
    <title>{title || 'Projects'}</title>
    <meta charSet="utf-8" />
    <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    <link
      rel="stylesheet"
      href="https://fonts.googleapis.com/icon?family=Material+Icons"
    />
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
    />
    <link
      rel="stylesheet"
      href="https://fonts.googleapis.com/css?family=Open+Sans|Roboto:300,500,900"
    />
    <script src="/static/modernizr.js" />
    <style>
      {`
        body {
          box-sizing: border-box;
          min-height: 100vh;
          margin: 0;
          padding: 40px;
          font-size: 16px;
          font-weight: 300;
          font-family: 'Open Sans', 'Arial Black', sans-serif;
        }
        h1, h2, h3, h4, h5, h6 {
          font-weight: 900;
          font-family: 'Roboto', 'Helvetic Neue', 'Helvetica', sans-serif;
        }
      `}
    </style>
  </Head>
)
