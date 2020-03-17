import React from 'react';

const AboutPage = () => {
  return (
    <div className="content">
      <h1>Tentang</h1>

      <p>Data kasus COVID-19 yang tertera pada aplikasi ini bersumber dari <strong>The Center for Systems Science and Engineering</strong> di <strong>John Hopkins University</strong> yang diakses melalui Application Programming Interface (API) yang disediakan oleh <a href="https://github.com/mathdroid/covid-19-api" target="_blank" rel="noopener noreferrer">@mathdroid</a> secara open source.</p>

      <p>Progressive Web Application (PWA) yang sedang Anda gunakan ini dibuat dengan tujuan untuk mempermudah dalam pengaksesan data.</p>
      
      <p>Namun, kesalahan dan/atau kerugian yang disebabkan oleh kekeliruan pada data tersebut bukan merupakan tanggung jawab pengembang.</p>

      <p>
        <strong>Github:</strong> <a href="https://github.com/miftahafina/covid19-data" target="_blank" rel="noopener noreferrer">miftahafina/covid19-data</a>
        <br />
        <strong>Email:</strong> <a href="mailto:surat@miftahafina.com">surat@miftahafina.com</a> 
      </p>
    </div>
  )
}

export default AboutPage;
