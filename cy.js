let body = $response.body;
let obj = JSON.parse(body);

// 只修改 svip 剩余时间
if (obj.svip && typeof obj.svip === "object") {
    obj.svip.expires_time = "4092599349";
}

$done({ body: JSON.stringify(obj) });
