import { useEffect } from "react";
import { useParams } from "react-router-dom";
import styles from './FileInclusionPage.module.css'

const FileInclusionPage = () => {
  const { fileName } = useParams();
  useEffect(() => {
    const div = document.getElementById("inclusionFileSection");
    fetch(`/${fileName}`)
      .then((response) => response.text())
      .then((data) => {
        div.innerHTML = data;
      });
  }, []);
  return (
    <div>
    <div id="inclusionFileSection" className={styles.includedFile}></div>

      <div className={styles.card}>
          <h3>Vulnerability: File Inclusion</h3>
          <div className={styles.desc}>To include a file edit the ?page=index.php in the URL to determine which file is included.</div>
      </div>
    </div>
  );
};
export default FileInclusionPage;
