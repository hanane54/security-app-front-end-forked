import { useEffect } from "react";
import { useParams } from "react-router-dom";
import styles from './FileInclusionPage.module.css'

const FileInclusionPage = () => {
  const { fileName } = useParams();
//  without protection against file inclusion  
//   useEffect(() => {
//     const div = document.getElementById("inclusionFileSection");
//     fetch(`/${fileName}`)
//       .then((response) => response.text())
//       .then((data) => {
//         div.innerHTML = data;
//       });
//   }, []);


// with protection against the file inclusion
// to prevent file inclusion we should check the file name
// to only allow the name of the wanted file. other than that we 
  useEffect(() => {
    const div = document.getElementById("inclusionFileSection");
    if( fileName === "fileInclusion.html" ){
        fetch(`/${fileName}`)
      .then((response) => response.text())
      .then((data) => {
        div.innerHTML = data;
      });
    } else {
        div.innerHTML = "";
    }
  }, []);

  return (
    <div>

      <div className={styles.card}>
          <h3>Vulnerability: File Inclusion</h3>
          <div className={styles.desc}>To include a file edit the ?page=index.php in the URL to determine which file is included.</div>
          <div id="inclusionFileSection" className={styles.includedFile}></div>
      </div>
    </div>
  );
};
export default FileInclusionPage;
