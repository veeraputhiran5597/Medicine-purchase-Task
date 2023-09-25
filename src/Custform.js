import "./CustForm.css";
import {useEffect, useState} from "react";
import axios from "axios";


const Custform=()=>
{


    const[temparr,settemparr]=useState([])

    const[Meddataarr,setMeddataarr]=useState([])

    const[Orderarr,setOrderarr]=useState([])

    const[increaceQan,setincreaceQan]=useState("0")


    const[inputdata,setInputdata]= useState({FullName:"",DateOfbirth:"",Age:"",gender:"",maritalstatus:"",Area:"",Nationality:""})

    const{FullName,DateOfbirth,Age,gender,maritalstatus,Area,Nationality}=inputdata;

    const[purchasecutdata,setpurchasecutdata]=useState([])

    function data(event){
        setInputdata({...inputdata,[event.target.name]:event.target.value})
    }

    console.log(temparr)


    const jsonget=()=>
    {
        axios.get("http://localhost:3000/Empdata")
        .then((response) => settemparr(response.data))
            .catch((err) =>console.log(err));
    }

    const Medget=()=>
    {
        axios.get(" http://localhost:3000/MadData")
        .then((response) => setMeddataarr(response.data))
            .catch((err) =>console.log(err));
    }

    

    useEffect(()=>{
        jsonget()
        Medget()
    },[])

    useEffect(()=>{
        Medget()
    },[Orderarr])

    const Datasubmitjson=(event)=>
    {
        
        if(FullName===""||DateOfbirth==="" ||Age==="" ||gender===""||maritalstatus===""||Area===""||Nationality==="")
        {
            event.preventDefault()
            alert("Please Enter valid data")
        }
        else
        {
         axios.post("http://localhost:3000/Empdata",{FullName,DateOfbirth,Age,gender,maritalstatus,Area,Nationality})
           .then((response)=>
         {
          settemparr([...temparr,response.data])
          setInputdata({FullName:"",DateOfbirth:"",Age:"",gender:"",maritalstatus:"",Area:"",Nationality:""})
          jsonget()
          console.log(response)          
         })
        .catch((error)=>console.log(error))
        }
    }

    const clearbtn=()=>
    {
      
        setInputdata({FullName:"",DateOfbirth:"",Age:"",gender:"",maritalstatus:"",Area:"",Nationality:""})
    }
    

    const GOTOPurchaseaction=(Fid)=>
    {
        let Prifile=temparr.filter((ele)=>{return ele.id===Fid})
        setpurchasecutdata(Prifile)
    }

    const Addpuchfn=(Prid)=>
    {   
        const Samedata = Orderarr.find(
            repeat => repeat.id === Prid
           );



        if(Samedata)
        {
            alert("Already Add in Purchace")
        }
        else
        {

        let pobj=Meddataarr.filter((ele)=>{return ele.id===Prid}).filter((ele)=>{return ele.Qan=increaceQan}).filter((ele)=>{return ele.Rate*=increaceQan})

        
        const Quanissu = pobj.find(
            repeat => repeat.Qan === "0"
           ); 
           
         if(Quanissu)
        {
               alert("Please Enter Quantity") 
        }   
        else
        {
        pobj.forEach((obj) => {
            
                setOrderarr([...Orderarr,obj])
            
            })
        setincreaceQan("0")
        }     
    }  
    }
    


    const removeitem=(id)=>
    {
        let Reob=Orderarr.filter((ele)=>{return ele.id!==id})
        setOrderarr(Reob)
    }


    const Formstart=()=>
    {
        return(
            <>
            <div className="modalcontainer">
                <div className="model">             
                
                    <form className="Formclass">
                        <div className="formgroup">
                            <lable htmlFor="FullName">FullName</lable>
                            <input name="FullName" type="text" value={inputdata.FullName} onChange={data} autoComplete="off" />
                        </div>
                        <div className="formgroup">
                            <lable htmlFor="Date Of birth">Date Of birth</lable>
                            <input name="DateOfbirth" type="date" value={inputdata.DateOfbirth} onChange={data} autoComplete="off" />
                        </div>
                        <div className="formgroup">
                            <lable htmlFor="Age">Age</lable>
                            <input name="Age" type="number" value={inputdata.Age} onChange={data} autoComplete="off" />
                        </div>
                        <div className="formgroup">
                            <lable htmlFor="gender" >Gender </lable>
                            <select name="gender" value={inputdata.gender} onChange={data}>
                                <option>-Select-</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Transgender">Transgender</option>
                            </select>
                        </div>
                        <div className="formgroup">
                            <div className="marital_status_name">marital status</div>
                            <select name="maritalstatus" value={inputdata.maritalstatus} onChange={data}>
                                <option>-Select-</option>
                                <option value="single">single</option>
                                <option value="married">married</option>
                            </select>
                        </div>
                        <div className="formgroup">
                            <lable htmlFor="Area">City</lable>
                            <input name="Area"  type="text" value={inputdata.Area} onChange={data} autoComplete="off" />
                        </div>
                        <div className="formgroup">
                            <lable htmlFor="Nationality">Nationality</lable>
                            <input name="Nationality"  type="text" value={inputdata.Nationality} onChange={data} autoComplete="off" />
                        </div>

                        <div className="formbtns">
                        <button type="submit" className="submitbtn" onClick={Datasubmitjson}>Submit</button>
                        <button className="submitbtn" onClick={clearbtn}>Clear</button>
                        </div>
                    </form>

                       
                </div>
            </div>
            </>
        )
    }


    const Tablecreate=()=>
    {
        return(
        <>
        
        <div className="tablestyle">
        <table className="tabletag">
            <thead className="tablethead">
                <tr>
                    <th className="tableth">FullName</th>
                    <th className="tableth">Date Of birth</th>
                    <th className="tableth">Age</th>
                    <th className="tableth">Gender</th>
                    <th className="tableth">marital status</th>
                    <th className="tableth">City</th>
                    <th className="tableth">Nationality</th>
                    <th className="tableth">Action</th>
                </tr>

            </thead>
            <tbody>

                {
                  temparr&&temparr.map((ele,ind) =>(
                <tr key={"mytbl"+ind}>
                    <td className="tabletd">{ele.FullName}</td>
                    <td className="tabletd">{ele.DateOfbirth}</td>
                    <td className="tabletd">{ele.Age}</td>
                    <td className="tabletd">{ele.gender}</td>
                    <td className="tabletd">{ele.maritalstatus}</td>
                    <td className="tabletd">{ele.Area}</td>
                    <td className="tabletd">{ele.Nationality}</td>
                    <td className="tabletd">
                         <button className="actionbtnedit" onClick={()=>GOTOPurchaseaction(ele.id)} >Go to purchase</button>
                    </td>
                </tr>
                ))
               }
            </tbody>
        </table>
        </div>
        

            </>
        )
    }

 



    const OrderPlace=()=>
    {
       
      
        var Totalamount=0;
        let Qan =parseInt(Orderarr.map((ele)=>{return ele.Qan}))
        console.log("qan",Qan)
        Orderarr.forEach((ele)=>{
            Totalamount+=ele.Rate
        })
        var GSTamount=(Totalamount*(18*Qan))/100
        var Grandtotal=Totalamount+GSTamount
    



       

        return(
            <>
            <div className="Ad_tablestyle">
            <div style={{width:"60%"}}>
            <h1 style={{textAlign:"center"}}>Your Order List</h1>
        <table className="Ad_tabletag">
            <thead className="tablethead">
                <tr>
                    <th className="Ad_tableth">Medicine name</th>
                    <th className="Ad_tableth">GST</th>
                    <th className="Ad_tableth">Rate</th>
                    <th className="Ad_tableth">Quantity</th>
                    <th className="Ad_tableth">Action</th>
                </tr>

            </thead>
            <tbody>

                {
                 Orderarr&&Orderarr.map((ele,ind) =>(
                <tr key={"mytbl"+ind}>
                    <td className="Ad_tableth">{ele.Pname}</td>
                    <td className="Ad_tableth">{ele.GST}</td>
                    <td className="Ad_tableth">{ele.Rate}</td> 
                    <td className="Ad_tableth">{ele.Qan}</td>                 
                    <td className="Ad_tableth">
                        <button className="actionbtnedit" onClick={()=>removeitem(ele.id)}>Remove</button>
                    </td>
                </tr>
                ))
               }
            </tbody>

            
        </table>

        </div>

        
        <div style={{width:"40%"}}>
        <div >
            <h3 style={{textAlign:"center"}}>Pyment detaile</h3>
        <table className="Rt_tabletag">
            <div className="Rt_tablethead">
                
                    <div className="Rt_tableth">Detaile</div>
                    <div className="Rt_tableth">Amount</div>
               

            </div>

            <div style={{display:"flex",width:"100%"}}>
           <div className="Tablebody">

                    <div className="Ad_tableth">Total GST Amount</div>

                    <div className="Ad_tableth">Total Amount</div>
                
                    <div className="Ad_tableth">Grand Total</div>
                   
              </div>

             

               <div className="netablebody">

                   
                    <div className="Ad_tableth">Rs.{GSTamount}</div>
                 
            
                    <div className="Ad_tableth">Rs.{Totalamount}</div>
                    
                  
                    <div className="Ad_tableth">Rs.{Grandtotal}</div>

             
              </div>
              </div>
              
        </table>

        </div>

        </div>
        </div>
            </>
        )
    }

    const Productplace=()=>
    {
        return(
            <>

<div className="PC_tablestyle">
<h1 style={{textAlign:"center"}}>Medicine List</h1>
        <table className="PC_tabletag">
            <thead className="tablethead">
                <tr>
                    <th className="PC_tableth">Medicine name</th>
                    <th className="PC_tableth">GST</th>
                    <th className="PC_tableth">Rate</th>
                    <th className="PC_tableth">Quantity</th>
                    <th className="PC_tableth">Action</th>
                </tr>

            </thead>
            <tbody>

                {
                 Meddataarr&&Meddataarr.map((ele,ind) =>(
                <tr key={"mytbl"+ind}>
                    <td className="PC_tabletd">{ele.Pname}</td>
                    <td className="PC_tabletd">{ele.GST}</td>
                    <td className="PC_tabletd">{ele.Rate}</td> 
                    <td className="PC_tabletd"><input style={{width:"50px"}} type="number" name={ind}  onChange={(e)=>{setincreaceQan(e.target.value)}}/></td>                 
                    <td className="PC_tabletd">
                         <button className="actionbtnedit" onClick={()=>{Addpuchfn(ele.id)}} >Add purchase</button>
                    </td>
                </tr>
                ))
               }
            </tbody>
        </table>
        </div>
        
        <div>
        {Orderarr.length===0?"":OrderPlace()}
        </div>  
        </>
        )
    }

    const purchaseBage=()=>
    {
        return(
            <>
            <div>
                {purchasecutdata&&purchasecutdata.map((ele,ind)=>{
                    return(
                        <>
                        <div key={ind}>
                        <h2>Welcome To purchase</h2>
                        <div style={{marginTop:"10px"}}>
                        <div>Name:{ele.FullName}</div>
                        <br/>
                        <div>Age:{ele.Age}</div>
                        <br/>
                        <div>Gender:{ele.gender}</div>
                        <br/>
                        <div>City:{ele.Area}</div>
                        <br/>
                        </div>
                       </div>
                        </>
                    )
                })

                }
                {Productplace()}
            </div>
            </>
        )
    }

    return(
        <>
        <div>
        <div>
        {Formstart()}
        </div>
        <div>
         {Tablecreate()}
        </div>
        {purchasecutdata.length===0?"":<div className="purPlace">
         {purchaseBage()}
        </div>}
        </div>
        </>
    )
}

export default Custform;