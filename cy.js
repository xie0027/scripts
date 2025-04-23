const url = $request.url;
const isRequest = typeof $request !== "undefined";

if (isRequest) {
    // 拦截请求
    if (/v1\/(satellite|nafp\/origin_images)/.test(url)) {
        const headers = $request.headers;
        headers['device-token'] = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ2ZXJzaW9uIjoxLCJ1c2VyX2lkIjoiNWY1YmZjNTdkMmM2ODkwMDE0ZTI2YmI4Iiwic3ZpcF9leHBpcmVkX2F0IjoxNzA1MzMxMTY2LjQxNjc3MSwidmlwX2V4cGlyZWRfYXQiOjB9.h_Cem89QarTXxVX9Z_Wt-Mak6ZHAjAJqgv3hEY6wpps';
        $done({ headers });
    } else {
        $done({});
    }
} else {
    // 拦截响应
    let body = $response.body;

    if (url.includes("/v2/user")) {
        const obj = JSON.parse(body);
        obj.result.is_vip = true;
        obj.result.vip_type = "s";
        obj.result.svip_expired_at = 4092599349;
        body = JSON.stringify(obj);
    }

    if (url.includes("v1/activity")) {
        body = '{"status":"ok","activities":[{"items":[{}]}]}';
    }

    $done({ body });
}
