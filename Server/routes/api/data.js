/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const express=require('express')
const router=express.Router();
const DataController=require('../../controller/Data')
router.route("/").get(DataController.dataList)

module.exports = router;