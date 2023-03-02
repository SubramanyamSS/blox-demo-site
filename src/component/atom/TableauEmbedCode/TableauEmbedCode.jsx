import React, { useEffect } from 'react';
import {EmbedCode} from './styled'

const TableauEmbedCode = () => {
  useEffect(() => {
    (function (d, s, id) {
      var js;
      if (d.getElementById(id)) {
        return;
      }
      js = d.createElement(s);
      js.id = id;
      js.src = "https://10az.online.tableau.com/javascripts/api/viz_v1.js";
      d.getElementsByTagName("head")[0].appendChild(js);
    })(document, "script", "TableauEmbedCode");
    document.getElementById("embedCode").innerHTML += "<div class='tableauPlaceholder' style='width: 100%; height: 665px;'><object class='tableauViz' width='100%' height='665' style='display:none;'><param name='host_url' value='https%3A%2F%2F10az.online.tableau.com%2F' /> <param name='embed_code_version' value='3' /> <param name='site_root' value='&#47;t&#47;madstreetden' /><param name='name' value='BloxFinance_updated_dashboard&#47;UserProfileDashboard' /><param name='tabs' value='no' /><param name='toolbar' value='yes' /><param name='showAppBanner' value='false' /></object></div>"
    return () => {
      document.getElementById("TableauEmbedCode").remove();
      document.getElementById("embedCode").innerHTML = "";
    };
  }, []);
  return (
    <EmbedCode id='embedCode'></EmbedCode>
  );
}

export { TableauEmbedCode };
