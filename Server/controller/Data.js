/* eslint-disable no-undef */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const data=require('../model/data.json')

const dataList=(req,res)=>{
    res.json(data)
}

module.exports={
    dataList
}