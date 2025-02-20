import React,{useState,useEffect} from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 
import { Button } from '@/components/ui/button';
export default function PatientTable() {
const [value,setValue] = useState([]);
//const [isOpen, setIsOpen] = useState(false);
const [searchTerm, setSearchTerm] = useState('');
const [filterdata,setFilterdata] = useState([]);
useEffect(() => {
  fetchDetail();
}, []); // Dependency array ensures it runs only once after the component mounts.
//console.log(`${import.meta.env.VITE_APP_API_BASE_URL}`);

const  fetchDetail = async () => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_APP_API_BASE_URL}/last-ind`);
    setValue(response.data);
    //console.log(`HIIIII ${process.env.REACT_APP_API_BASE_URL}`);
    //console.log(`${import.meta.env.REACT_APP_API_BASE_URL}`);
    //const response1 = await axios.get('https://backend-spue.onrender.com/last-ind');
    //console.log(response1);
//   console.log(response.data);`${process.env.REACT_APP_API_BASE_URL}/data`

  } catch (error) {

   // console.log(error);
    alert("error happen while fetching");
  }
};
const navigate = useNavigate();
const handelnavigate = () =>{
  navigate("/");
}
  useEffect(() => {
    if (!searchTerm) {
      // Show all data if searchTerm is empty
      setFilterdata(value);
    } else {
      // Filter data based on searchTerm
      const lowercasedTerm = searchTerm.toLowerCase();
      const filtered = value.filter(patient => {
        const PAT_NM = patient?.PAT_NM?.toLowerCase() || '';
        const MOBNO = patient?.MOBNO || '';
        const BILL_NO = patient?.BILL_NO || '';
        return (
          PAT_NM.includes(lowercasedTerm) ||
          MOBNO.includes(searchTerm)||
          BILL_NO.includes(searchTerm)
        );
      });
     // console.log(filtered);
      setFilterdata(filtered);
    }
  }, [searchTerm, value]);


  return (
    <Card className="w-full">
      <CardHeader className="bg-indigo-50">
        <CardTitle className="text-xl text-center text-indigo-900">Patient Records</CardTitle>
        <div className="flex items-center gap-4 mt-4 w-full">
  <Button onClick={handelnavigate} className="shrink-0">BACK</Button>
  <Input 
    placeholder="Search patients by name, phone, or bill number"
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
    className="flex-1"
  />
</div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
        <Table className="min-w-full border-collapse border border-gray-200 shadow-md rounded-lg">
          <TableHeader className="bg-indigo-200">
    <TableRow>
      <TableHead className="text-indigo-900 font-semibold border-b border-gray-300 py-2 px-4">
        Patient Name
      </TableHead>
      <TableHead className="text-indigo-900 font-semibold border-b border-gray-300 py-2 px-4">
        Phone
      </TableHead>
      <TableHead className="text-indigo-900 font-semibold border-b border-gray-300 py-2 px-4">
        Address
      </TableHead>
      <TableHead className="text-indigo-900 font-semibold border-b border-gray-300 py-2 px-4">
        Bill No
      </TableHead>
      <TableHead className="text-indigo-900 font-semibold border-b border-gray-300 py-2 px-4">
        Bill Date
      </TableHead>
      <TableHead className="text-indigo-900 font-semibold border-b border-gray-300 py-2 px-4">
        Reports Approved
      </TableHead>
      <TableHead className="text-indigo-900 font-semibold border-b border-gray-300 py-2 px-4">
        Reports Pending
      </TableHead>
      <TableHead className="text-indigo-900 font-semibold border-b border-gray-300 py-2 px-4">
        Download Bill
      </TableHead>
      <TableHead className="text-indigo-900 font-semibold border-b border-gray-300 py-2 px-4">
        Download Report
      </TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    {filterdata.map((row, i) => (
      <TableRow
        key={i}
        className={`hover:bg-indigo-50 ${
          i % 2 === 0 ? "bg-white" : "bg-gray-100"
        }`}
      >
        <TableCell className="py-1 px-1 border-b border-gray-300  text-lg font-medium text-black-600">
          {row.PAT_NM}
        </TableCell>
        <TableCell className="py-1 px-1 border-b border-gray-300  text-lg text-black-600">
          {row.MOBNO}
        </TableCell>
        <TableCell className="py-1 px-1 border-b border-gray-300 text-lg text-black-600">
          {row.ADDR}
        </TableCell>
        <TableCell className="py-1 px-1 border-b border-gray-300  text-lg text-gray-600 text-lg">
          {row.BILL_NO}
        </TableCell>
        <TableCell className="py-1 px-1 border-b border-gray-300  text-lg text-black-600">
          {row.ENT_DT.substring(0,10)}
        </TableCell>
        <TableCell className="py-1 px-1 text-lg border-b border-gray-300 text-black-600">
          {row.SERVICES}
        </TableCell>
        <TableCell className="py-1 px-1  text-lg border-b border-gray-300 text-black-600">
          {row.SERVICES}
        </TableCell>
        <TableCell className="py-1 px-1 border-b border-gray-300">
          <button className="text-blue-600 hover:text-blue-800 font-semibold underline">
            Download
          </button>
        </TableCell>
        <TableCell className="py-2 px-1 border-b border-gray-300">
          <button className="text-blue-600 hover:text-blue-800 font-semibold underline">
            Download
          </button>
        </TableCell>
      </TableRow>
    ))}
  </TableBody>
</Table>

        </div>
      </CardContent>
    </Card>
  );
}