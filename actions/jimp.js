"use server";

import Jimp from "jimp";

const readImage = async (image) => {
  // console.log("readImage: ", image);
  const imageBuffer = new Buffer(image, "base64");

  const sourceImg = await Jimp.read(imageBuffer);
  // , 0x0012faff
  return new Promise((resolve, reject) => {
    const img = new Jimp(300, 150);

    img
      .composite(sourceImg, 50, 50)
      .getBase64(Jimp.MIME_PNG, (err, val) => resolve(val));

    // Jimp.read(imageBuffer)
    //   .then((image) => {
    //     // console.log("image: ", image);
    //     image
    //       .background(0x0012faff)
    //       .getBase64(Jimp.MIME_PNG, (err, val) => resolve(val));
    //   })
    //   .catch((error) => {
    //     reject(error);
    //   });
  });
};

// import { fetchImages } from "@/lib/images";

// import Image from "next/image";
// import { Glimpse } from "@/components/app/glimpse";
// import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
// import { Label } from "@/components/ui/label";

// import { ListImages } from "../list-images";
//
// const ListImgs = async () => {
//   const images = await fetchImages();
//
//   // const onChangeItem = (v) => console.log(v);
//
//   return <ListImages list={images} />;
// };
//
// export { ListImgs };

/**
 * const { img, name } = await req.json();

  const base64Prepared = img.split(";base64,").pop();
  const imageBuffer = Buffer.from(base64Prepared, "base64");

  fs.writeFileSync(`./public/${name}`, imageBuffer);

  return Response.json({ result: true });
 */

export { readImage };
