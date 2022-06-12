import React, {useRef} from 'react'

 const ImageUploader = ({onFileSelectError},{onFileSelectSuccess}) => {
    const ImageInput = useRef(null)

    const handleImageInput = (e) => {
        // handle validations
        const file = e.target.files[0];
        if (file.size > 1024)
          onFileSelectError({ error: "File size cannot exceed more than 1MB" });
        else onFileSelectSuccess(file);
    }

    return (
        <div className="file-uploader">
          <label>Upload image </label>
            <input type="file" onChange={handleImageInput}/>
            <button onClick={e => ImageInput.current && ImageInput.current.click()} className="btn btn-primary"/>
        </div>
    );
}
export default ImageUploader;