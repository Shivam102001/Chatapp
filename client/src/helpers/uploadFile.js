// const url = "https://api.cloudinary.com/v1_1/dbfethnol/auto/upload";

// // console.log('Cloud name',process.env.REACT_APP_CLOUDINARY_CLOUD_NAME);

// const uploadFile= async(file)=>{
//   const formData=new FormData();
//   formData.append('file',file)
//   formData.append("upload_present","chatappfile")

//   const  response= await fetch(url,{
//     method:'POST',
//     body:formData
//   })
//    const responseData=await response.json();
//    return responseData 
// }
// export default uploadFile
const url = "https://api.cloudinary.com/v1_1/dbfethnol/auto/upload";

const uploadFile = async (file) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', 'chatappfile'); // Corrected typo

  try {
    const response = await fetch(url, {
      method: 'POST',
      body: formData
    });

    if (!response.ok) {
      throw new Error(`Upload failed with status ${response.status}`);
    }

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error('Error uploading file:', error);
    throw error;
  }
};

export default uploadFile;

