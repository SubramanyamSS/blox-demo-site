import React, {useState, useEffect} from "react";
import { DefaultUserUrl } from "../../configs";
import { getCookie, generate_uuid, setCookie } from "../../common";

const RedirectPage = () => {
  useEffect(() => {
    const url = new URL(window.document.location.href);
    const userName = url.searchParams.get('user');
    const password = url.searchParams.get('pw');
    const formData = new FormData();
    formData.append('email', userName);
    formData.append('password', password);
    fetch(`${DefaultUserUrl.endPoint}/api/signin/`, {
      method: 'POST',
      body: formData,
    })
    .then(data => data.json())
    .then(response => {
      const { status, config } = response;
      if (status === 'failure') {
        window.location.href = '/login';
      } else if (config && status === 'success') {
        const userConfig = Object.assign(config, {API_KEY: config.api_key});
        userConfig.userName = userName;
        localStorage.setItem(
          'userConfig',
          JSON.stringify(userConfig)
        );
        localStorage.setItem('userId', userName);
        const UUID = getCookie('mad_UUID');
        if (!UUID && UUID == '') {
          const uuid = generate_uuid("demosite_")
          localStorage.setItem("mad_UUID", uuid);
          setCookie(
            "mad_UUID",
            uuid,
            365
          );
        }
        window.location.href = '/discover';
      }
    }).catch(err => {
      console.log('err', err);
    });
  }, []);

  return <div>
    <p style={{ marginTop: "70px", marginLeft: "1.5em" }}>Redirecting...</p>
  </div>
}

export default RedirectPage;