/* eslint-disable jsx-a11y/alt-text */
import React, { useState } from 'react'
import Navbar from '../../components/navbar/Navbar'
import Sidebar from '../../components/sidebar/Sidebar'
import axios from 'axios';
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import history from '../../history';
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";


const AddProducts = () => {

    const navitage = useNavigate()
    const [item, setItem] = useState({
        namePack: '',
        image: null,
        description: '',
        length: '',
        width: '',
        packageTypeId: '',
        price: '',
        status: '',
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        // setItem({
        //     ...item,
        //     [name]: value
        // });
        setItem((prevItem) => ({
            ...prevItem,
            [name]: value
        }));
    };

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        setItem((prevItem,) => ({
            ...prevItem,
            image: file
        }));
    };



    const handleSubmit = (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append('namePack', item.namePack);
        formData.append('description', item.description);
        formData.append('price', item.price);
        formData.append('image', item.image);
        formData.append('length', item.length);
        formData.append('width', item.width);
        formData.append('status', item.status);
        formData.append('packageTypeId', item.packageTypeId);
        // const formData = {
        //     namePack: item.namePack,
        //     image: item.image,
        //     description: item.description,
        //     length: item.length,
        //     width: item.width,
        //     packageTypeId: item.packageTypeId,
        //     price: item.price,
        //     status: item.status,
        // }


        const token = localStorage.getItem("accessToken");
        // axios.post('https://lacha.s2tek.net/api/GardenPackage/create', formData)
        axios({
            method: "POST",
            url: `https://lacha.s2tek.net/api/GardenPackage/create`,
            data: formData,
            headers: {
                'Accept': '/',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        })
            .then((response) => {
                console.log(response.data);

                navitage('/products')

            })
            .catch((error) => {
                console.log(error);


            });


    };

    return (
        <div className="new">
            <Sidebar />
            <div className="newContainer">
                <Navbar />
                <div className="top">
                    {/* <form onSubmit={handleSubmit} encType="multipart/form-data">
                        <input type="text" name="namePack" value={item.namePack} onChange={handleChange} />cxxzcz
                        <input type="text" name="description" value={item.description} onChange={handleChange} />hfdgdf
                        <input type="text" name="price" value={item.price} onChange={handleChange} />fdsdf
                        <input type="file" name="image" onChange={handleImageChange} />fsdfs
                        <button type="submit">Add Item</button>
                    </form> */}

                    <div className="bottom">
                        <div className="left">
                            <img
                                src={
                                    item.image
                                        ? URL.createObjectURL(item.image)
                                        : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                                }
                                alt=""
                            />
                        </div>
                        <div className="right">
                            <form onSubmit={handleSubmit} encType="multipart/form-data">
                                <div className="formInput">
                                    <label htmlFor="image">
                                        Image: <DriveFolderUploadOutlinedIcon className="icon" />
                                    </label>
                                    <input
                                        type="image"
                                        id="image"
                                        name="image"
                                        onChange={handleImageChange}
                                        style={{ display: "none" }}
                                    />
                                </div>

                                <div className="formInput" >
                                    <div className="mb-10">
                                        <label
                                            htmlFor="namePack"
                                            className="block text-sm font-semibold text-gray-800"
                                        >
                                            ??? Name Pack
                                        </label>
                                        <input className="block w-full px-4 py-2 mt-2 text-green-700 bg-white border rounded-md focus:border-green-400 focus:ring-green-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                            type="text"
                                            // id="namePack"
                                            name="namePack"
                                            value={item.namePack}
                                            onChange={handleChange} />
                                    </div>

                                    <div className="mb-10">
                                        <label
                                            htmlFor="description"
                                            className="block text-sm font-semibold text-gray-800"
                                        >
                                            ??? Description
                                        </label>
                                        <input className="block w-full px-4 py-2 mt-2 text-green-700 bg-white border rounded-md focus:border-green-400 focus:ring-green-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                            type="text"
                                            // id="description"
                                            name="description"
                                            value={item.description}
                                            onChange={handleChange} />
                                    </div>

                                    <div className="mb-10">
                                        <label
                                            htmlFor="length"
                                            className="block text-sm font-semibold text-gray-800"
                                        >
                                            ??? Length
                                        </label>
                                        <input className="block w-full px-4 py-2 mt-2 text-green-700 bg-white border rounded-md focus:border-green-400 focus:ring-green-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                            type="text"
                                            // id="length"
                                            name="length"
                                            value={item.length}
                                            onChange={handleChange} />
                                    </div>

                                    <div className="mb-10">
                                        <label
                                            htmlFor="width"
                                            className="block text-sm font-semibold text-gray-800"
                                        >
                                            ??? Width
                                        </label>
                                        <input className="block w-full px-4 py-2 mt-2 text-green-700 bg-white border rounded-md focus:border-green-400 focus:ring-green-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                            type="text"
                                            // id="width"
                                            name="width"
                                            value={item.width}
                                            onChange={handleChange} />
                                    </div>

                                    <div className="mb-10">
                                        <label
                                            htmlFor="status"
                                            className="block text-sm font-semibold text-gray-800"
                                        >
                                            ???Status
                                            <select className="block w-full px-4 py-2 mt-2 text-green-700 bg-white border rounded-md focus:border-green-400 focus:ring-green-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                                type="text"
                                                // id="status"
                                                name="status"
                                                value={item.status}
                                                onChange={handleChange} >
                                                <option value="">--Please Select--</option>
                                                <option value="1">Active</option>
                                                <option value="0">Inactive</option>
                                            </select>
                                        </label>

                                    </div>

                                    <div className="mb-10">
                                        <label
                                            htmlFor="password"
                                            className="block text-sm font-semibold text-gray-800"
                                        >
                                            ??? Price
                                        </label>
                                        <input className="block w-full px-4 py-2 mt-2 text-green-700 bg-white border rounded-md focus:border-green-400 focus:ring-green-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                            type="text"
                                            // id="price"
                                            name="price"
                                            value={item.price}
                                            onChange={handleChange} />
                                    </div>

                                    <div className="mb-10">
                                        <label
                                            htmlFor="password"
                                            className="block text-sm font-semibold text-gray-800"
                                        >
                                            ???PackageTypeId
                                            <select className="block w-full px-4 py-2 mt-2 text-green-700 bg-white border rounded-md focus:border-green-400 focus:ring-green-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                                type="text"
                                                // id="packageTypeId"
                                                name="packageTypeId"
                                                value={item.packageTypeId}
                                                onChange={handleChange}
                                            >
                                                <option value="">--Please Select--</option>
                                                <option value="1">Traditional</option>
                                                <option value="2">Classic</option>
                                                <option value="3">Morden</option>
                                            </select>
                                        </label>

                                    </div>
                                </div>

                                <button type="submit">
                                    Send
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div >
        </div >
    )
}

export default AddProducts