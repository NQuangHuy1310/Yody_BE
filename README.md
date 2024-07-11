# Gới thiệu về API

-   Authentication: Login, Register, Logout
-   Account: Me, Block user, Un block user, Get users, Get admins

## Công nghệ sử dụng

Node.js + Express + Mongoose

Nó sẽ chạy ở url [http://localhost:2024/api/v1](http://localhost:2024/api/v1)

## Format response trả về

Định dạng trả về là JSON, và luôn có trường `message`, ngoài ra sẽ có thêm trường data

Đây là ví dụ về response khi thành công

```json
{
    "message": "Đăng nhập thành công!",
    "user_data": {
        "id": "668d4d8dcfb6c126d93becc2",
        "user_name": "Nguyen Quang Huy",
        "user_email": "huynq13102004@gmail.com",
        "user_avatar": {},
        "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2OGQ0ZDhkY2ZiNmMxMjZkOTNiZWNjMiIsImlhdCI6MTcyMDY5OTQ4NCwiZXhwIjoxNzIwNzAxMjg0fQ.XMggGHejOd8poKVOh2wwHiFzfkvUtZ7qwRwKGgV2YBU"
    }
}
```

Trong trường hợp lỗi thì sẽ trả về mã lỗi `422` và thông tin về lỗi

## Chi tiết các API

Mặc định API sẽ chạy ở địa chỉ [http://localhost:2024/api/v1](http://localhost:2024/api/v1).

Các API cần xác thực người dùng như `Account` yêu cầu gửi token để server biết người dùng.

### Test API: Muốn biết api có hoạt động không

-   `GET /status`: Trả về message để kiểm tra API hoạt động.

### Authentication

-   `POST /auth/register`: Đăng ký tài khoản với thông tin `user_name`, `user_password`, `user_email`.

-   `POST /auth/login`: Đăng nhập với thông tin `user_password`, `user_email`.

-   Khi đăng nhập thành công, server sẽ tự động trả về `access_token` và `refreshToken`, với `refreshToken` được set vào cookie.
-   `POST /auth/logout`: Đăng xuất sẽ xoá `refreshToken` khỏi cookie.

Kho logout thành công thì server sẽ tự động xoá `refreshToken` trong cookie

# Account: cần xác thực

-   `GET /account/me`: Lấy tông tin cá nhân
-   `PUT /account/me`: Cập nhật thông tin cá nhân

```json
{
    "user_name": "Nguyen Quang Huy",
    "user_gender": "Nam",
    "user_birthday": "2004-10-13"
}
```

-   `GET /users?page=1&limit=10`: Lấy thông tin người dùng, có thể thay đổi `page` và `limit`.
-   `GET /admin?page=1&limit=10`: Lấy thông tin admin, có thể thay đổi `page` và `limit`.

-   `PUT /:id/block`: Chặn người dùng bằng ID.
-   `PUT /:id/unblock`: Bỏ chặn người dùng bằng ID.
    Truyền id của người dùng muốn chặn vào để có thể chặn người dùng

-   `DELETE /:id`: Xoá người dùng bằng ID (thực chất là set `is_active: false`).
