# Cộng tác phát triển game

## Phân chia công việc

| Người phụ trách | Chương trình | Thư mục |
| --- | --- | --- |
| Phúc | DELF A2 — đọc hiểu và viết | `french/delf-a2/` |
| Khuong | TOEIC — Reading | `english/toeic/` |

Ưu tiên Reading và Writing ở giai đoạn đầu. Listening và Speaking chưa thuộc phạm vi hiện tại.

Trang chủ chỉ giữ French Games và English Games. Mỗi trang ngôn ngữ giữ các game hiện có và liên kết tới chương trình tương ứng. Chưa tạo thư mục game rỗng hoặc nút chơi không hoạt động.

## Quy trình

- Cập nhật từ `main` trước khi tạo branch riêng, ví dụ `feature/delf-a2-game-01` hoặc `feature/toeic-game-01`.
- Mỗi người tập trung vào thư mục chương trình mình. Thống nhất trước khi sửa `shared/`, trang chủ hoặc các trang danh mục dùng chung.
- Chạy kiểm tra từ thư mục gốc, chơi thử trên desktop và mobile, rồi tạo Pull Request vào `main`.
- Không push trực tiếp hoặc tự động merge vào `main`. Chủ repository xem và merge PR khi sẵn sàng.

## Quy ước chung

- Điểm số hiển thị theo mẫu **⭐ Score: 0**, cập nhật trong lúc chơi.
- Dùng lại footer Facebook của trang chương trình, liên kết `https://www.facebook.com/kunido/`.
- Tích hợp GA4 `G-JXNH96HZ0Q` qua `shared/analytics.js`, giữ cơ chế consent hiện có; không chèn thêm gtag.
- Dùng các sự kiện `game_start`, `mission_complete`, `game_complete`, `game_replay`, `share_result` khi hành động tương ứng thật sự xảy ra. Kiểm tra API hiện có trước khi dùng; tránh gửi `game_complete` hai lần nếu hệ thống rewards đã gửi.
- Mỗi game có hướng dẫn, phản hồi đúng/sai, giải thích đáp án và nút chơi lại. Bài đọc kiểm tra khả năng hiểu văn bản; bài viết có mục đích giao tiếp rõ ràng và tiêu chí tự đánh giá.
- Liên kết dùng đường dẫn tương đối để hoạt động trên GitHub Pages; ảnh có mô tả phù hợp; thao tác được bằng bàn phím.

## Kiểm tra

```sh
python3 tests/check_release.py
node tests/logic.cjs
```

Các kiểm tra tự động hiện có kiểm tra liên kết nội bộ, cú pháp JavaScript, footer và logic các game đã có. Khi thêm gameplay mới, bổ sung kiểm tra cho hành vi quan trọng của game đó và chơi thử thực tế.
