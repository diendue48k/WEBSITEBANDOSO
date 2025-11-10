import { Site, SiteDetail, Person, PersonDetail } from '../types';

export const MOCK_SITES: Site[] = [
  { site_id: 1, site_name: 'Cầu Rồng', site_type: 'Địa điểm du lịch', latitude: 16.0613, longitude: 108.2274, address: 'An Hải, Đà Nẵng', established_year: 2013, status: 'Đang hoạt động', description: 'Cầu Rồng là cây cầu có kiến trúc độc đáo nhất Việt Nam, là con đường ngắn nhất nối sân bay quốc tế Đà Nẵng với những trục đường chính trong thành phố. Không chỉ đóng vai trò là đường giao thông huyết mạch của thành phố, cầu Rồng, với kiến trúc mô phỏng con rồng thời Lý đang vươn mình bay ra biển, là một trong những kiến trúc mang tính biểu tượng của thành phố Đà Nẵng', additional_info: { 'Chiều dài': '666m', 'Chiều rộng': '37.5m', 'Số làn xe': '6 làn', 'Kinh phí': '~1.500 tỷ VNĐ', 'Lịch phun lửa/nước': '21:00 Thứ 7, Chủ Nhật' } },
  { site_id: 2, site_name: 'Bà Nà Hills', site_type: 'Địa điểm du lịch', latitude: 15.9961, longitude: 107.9899, address: 'Bà Nà, Đà Nẵng', established_year: 2009, status: 'Đang hoạt động', description:  'Bà Nà là một rặng núi cao ở phía Tây Nam Đà Nẵng, nổi tiếng với khu du lịch Sun World Ba Na Hills trên đỉnh núi, thu hút du khách bởi khí hậu mát mẻ quanh năm, kiến trúc châu Âu độc đáo, và hệ thống cáp treo hiện đại. Nơi đây còn được ví như lá phổi xanh với nhiều điểm tham quan và giải trí hấp dẫn. '},
  { site_id: 3, site_name: 'Danh thắng núi Ngũ Hành Sơn', site_type: 'Địa điểm du lịch', latitude: 16.0044, longitude: 108.2635, status: 'Đang hoạt động', description:'Ngũ Hành Sơn là một quần thể danh thắng thiên nhiên và tâm linh gồm sáu ngọn núi đá vôi: Kim Sơn, Mộc Sơn, Thủy Sơn, Hỏa Sơn, Thổ Sơn và Âm Hỏa Sơn, nằm ở phía đông nam thành phố Đà Nẵng. Nơi đây nổi tiếng với sự kết hợp hài hòa giữa cảnh quan thiên nhiên hùng vĩ và các công trình văn hóa tâm linh, với nhiều hang động đẹp và những ngôi chùa cổ kính. '  },
  { site_id: 4, site_name: 'Bảo tàng Điêu khắc Chăm', site_type: 'Bảo tàng', latitude: 16.060292, longitude: 108.223433, address: 'Hải Châu, Đà Nẵng', established_year: 1915, status: 'Đang hoạt động', description:'Bảo tàng Điêu khắc Chăm Đà Nẵng là một bảo tàng lịch sử văn hóa quan trọng, trưng bày bộ sưu tập hiện vật điêu khắc Chăm Pa lớn nhất Việt Nam. Nơi đây lưu giữ hàng ngàn cổ vật quý giá từ các tháp Chăm, thành lũy thuộc duyên hải Nam Trung Bộ và các tỉnh Tây Nguyên. Bảo tàng được xây dựng theo kiến trúc pha trộn phong cách Pháp cổ điển và nét đặc trưng của Chăm Pa, với tòa nhà chính mang vẻ uy nghiêm, thanh thoát. ' },
  { site_id: 5, site_name: 'Chùa Linh Ứng', site_type: 'Địa điểm du lịch', latitude: 16.099932, longitude: 108.277646 },
  { site_id: 6, site_name: 'Cầu Sông Hàn', site_type: 'Bridge', latitude: 16.0725, longitude: 108.2270 },
];

export const MOCK_PERSONS: Person[] = [
    { person_id: 1, full_name: 'Nguyễn Bá Thanh', birth_year: 1953, death_year: 2015 },
];


export const MOCK_SITE_DETAILS: SiteDetail[] = [
  {
    site_id: 1,
    site_name: 'Cầu Rồng',
    site_type: 'Địa điểm du lịch',
    latitude: 16.0613,
    longitude: 108.2274,
    address: 'An Hải, Đà Nẵng',
    established_year: 2013,
    status: 'Đang hoạt động',
    description: 'Cầu Rồng là cây cầu có kiến trúc độc đáo nhất Việt Nam, là con đường ngắn nhất nối sân bay quốc tế Đà Nẵng với những trục đường chính trong thành phố. Không chỉ đóng vai trò là đường giao thông huyết mạch của thành phố, cầu Rồng, với kiến trúc mô phỏng con rồng thời Lý đang vươn mình bay ra biển, là một trong những kiến trúc mang tính biểu tượng của thành phố Đà Nẵng',
    additional_info: { 'Chiều dài': '666m', 'Chiều rộng': '37.5m', 'Lịch phun lửa/nước': '21:00 Thứ 6, Thứ 7, Chủ Nhật' },
    events: [
      {
        event_id: 101,
        event_name: 'Cuộc thi thiết kế kiến trúc Cầu Rồng',
        start_date: 'Cuối năm 2005',
        description: 'UBND thành phố Đà Nẵng tổ chức cuộc thi thiết kế kiến trúc Cầu Rồng, với sự tham gia của 8 đơn vị tư vấn thiết kế (4 công ty Việt Nam, 2 công ty Nhật Bản, 1 công ty Đức và 1 công ty Mỹ). Với tổng cộng hơn 15 dự án được trình bày. ',
        persons: [{ person_id: 1, full_name: 'Nguyễn Bá Thanh' }],
        media: [
            { media_id: 10, media_url: 'https://img.dothi.net/Storage/Images/cau-rong-da-nang4.jpg', media_type: 'image', caption: 'Bản phác thảo kiến trúc công trình Cầu Rồng' },
            { media_id: 11, media_url: 'https://img.dothi.net/Storage/Images/cau-rong-da-nang4.jpg', media_type: 'image', caption: 'Phối cảnh kiến trúc công trình Cầu Rồng' },
            { media_id: 12, media_url: 'https://thanhnien.mediacdn.vn/Uploaded/2014/Pictures20125/Vu/165/cau-rong-1.jpg', media_type: 'image', caption: 'Nhà điêu khắc Phạm Văn Hạng thuyết trình ý tưởng sáng tạo thiết kế mẫu đầu rồng, đuôi rồng' },
            { media_id: 13, media_url: 'https://filesdata.cadn.com.vn/filedatacadn/media//Images/uploadImages/2009/T_07/Ng_16/10.jpg', media_type: 'image', caption: 'Phối cảnh kiến trúc công trình Cầu Rồng' }
        ]
      },
      {
        event_id: 102,
        event_name: 'Khởi công dây dựng Cầu Rồng',
        start_date: '2009-07-19',
        description: 'Tháng 10/2007, Phương án thiết kế của liên danh The Louis Berger và Ammann & Whitney (Mỹ) được chọn để thực hiện dự án. Ngày 17/12/2008 UBND thành phố Đà Nẵng phê duyệt dự án Cầu Rồng. Ngày 19/7/2009 Khởi công xây dựng Cầu Rồng tại bờ đông sông Hàn, Buổi lễ có sự tham dự của Thủ tướng Nguyễn Tấn Dũng cùng nhiều quan chức Chính phủ cấp cao.',
        persons: [{ person_id: 1, full_name: 'Nguyễn Bá Thanh' }],
        media: [
            { media_id: 14, media_url: 'https://filesdata.cadn.com.vn/filedatacadn/media//Images/uploadImages/2009/T_07/Ng_20/VH%20%286%29.jpg', media_type: 'image', caption: 'Lễ khởi công xây dựng cầu rồng' },
            { media_id: 16, media_url: 'https://cdn.vntour.com.vn/storage/media/img/2019/07/29/xay-dung-cau-rong_1564395265.jpg', media_type: 'image', caption: 'Nhịp chính Cầu Rồng đã được hợp long ngày 26-10-2012' },
            { media_id: 16, media_url: 'https://static.tuoitre.vn/tto/i/s626/2013/02/20/Uk2w8Fps.jpg', media_type: 'image', caption: 'Lắp ráp đầu Cầu Rồng' },
            { media_id: 200, media_url: 'https://youtu.be/tSlni_dHiYY?si=SKn60l_KQjNZqMRG', media_type: 'video', caption: 'Trình tự xây dựng Cầu Rồng', thumbnail_url: 'https://i.ytimg.com/vi/tSlni_dHiYY/maxresdefault.jpg' },
            
        ]
      },
      {
        event_id: 102,
        event_name: 'Lễ khánh thành Cầu Rồng',
        start_date: '2013-03-29',
        description: 'Ngày 26/10/2012 Nhịp chính của cầu được hoàn thành. Ngày 29/3/2013 Cầu Rồng chính thức thông xe, đưa vào sử dụng, nhân dịp kỷ niệm 38 năm ngày giải phóng thành phố Đà Nẵng (29/3/1975 – 29/3/2013).',
        media: [
            { media_id: 14, media_url: 'https://cdnmedia.baotintuc.vn/2013/03/30/07/41/T2-cau-rong.jpg', media_type: 'image', caption: 'Lễ khánh thành cầu Rồng' },
            { media_id: 15, media_url: 'https://anh.24h.com.vn/upload/1-2013/images/2013-03-29/1364528944-khanh-thanh-cau-4.jpg', media_type: 'image', caption: 'Lễ khánh thành cầu Rồng' },
            { media_id: 16, media_url: 'https://bqn.1cdn.vn/2013/03/29/images.baoquangnam.vn-dataimages-201303-original-_images638288_dsc_0027.jpg', media_type: 'image', caption: 'Cầu Rồng lộng lẫy trong ngày khánh thành.' },
            { media_id: 17, media_url: 'https://puolotrip.com/images/pro/package-media-cau-rong-da-nang-1916.jpg', media_type: 'image', caption: 'Cầu Rồng phun lửa trong ngày khánh thành.' },
            { media_id: 18, media_url: 'https://cdn3.ivivu.com/2017/05/ngam-cau-rong-phun-lua-phun-nuoc-trai-nghiem-phai-thu-khi-den-du-lich-Da-Nang-ivivu-1.jpg', media_type: 'image', caption: 'Vẻ đẹp uy nghi, lộng lẫy giữa lòng thành phố' },
            { media_id: 19, media_url: 'https://thanhnien.mediacdn.vn/Uploaded/sonlh/2022_08_01/anh-cau-rong-2731.jpg', media_type: 'image', caption: 'Cầu Rồng về đêm thơ mộng' },
            { media_id: 201, media_url: 'https://youtu.be/jK9Oe6J3Zdg?si=06xE8XJiHmly-8Hl', media_type: 'video', caption: 'Vẻ đẹp cầu Rồng', thumbnail_url: 'https://puolotrip.com/images/pro/package-media-cau-rong-da-nang-1916.jpg' },
            { media_id: 202, media_url: 'https://youtu.be/dLE3t5vyEJs?si=bYRX_Yz3Qp_dZe4Y', media_type: 'video', caption: 'Vẻ đẹp cầu Rồng', thumbnail_url: 'https://puolotrip.com/images/pro/package-media-cau-rong-da-nang-1916.jpg' },
            { media_id: 203, media_url: 'https://youtu.be/I5dooJoebFY?si=7gf8yXmMxzxusU3l', media_type: 'video', caption: 'Vẻ đẹp cầu Rồng', thumbnail_url: 'https://puolotrip.com/images/pro/package-media-cau-rong-da-nang-1916.jpg' },
        ]
      },
      {
        event_id: 103,
        event_name: 'Đoạt Giải thưởng Kỹ Thuật xuất sắc (EEA) năm 2014',
        start_date: '2014-04-30',
        description: 'Sáng 30-4 (theo giờ Việt Nam), tại Thủ đô Oa-sinh-tơn (Mỹ), Hội đồng các công ty kỹ thuật Mỹ đã trao tặng cầu Rồng của TP Ðà Nẵng Giải thưởng kỹ thuật xuất sắc (EEA) năm 2014. Ðây là một trong tám công trình và dự án xuất sắc nhất thế giới được vinh danh và trao tặng giải thưởng danh giá nhất của ngành kỹ thuật thế giới. Cầu Rồng bắc qua sông Hàn được chính thức thông xe vào tháng 3-2013 với 666 m chiều dài, bao gồm sáu làn xe chạy. Cây cầu được đánh giá cao về thiết kế và kết cấu độc đáo, mang hình ảnh đặc trưng văn hóa Việt và cội nguồn của người Việt; đồng thời kết hợp hài hòa giữa thẩm mỹ và tính năng sử dụng, cũng như giá trị kinh tế - xã hội và kỹ thuật.',
        media: [
           {media_id: 20, media_url: 'https://cdn.nhandan.vn/images/79c6dd00909745ca3057568791e31a4b5d79017e1c82c89341da8a8f9a9c98ca04ddfb41b809b58f930b454b595562f19159fd3c795147ba52e8f6dcde027ba179191b8cab011ed2f9b8bc33ed0f1d71/551d9da1f6a9b9f7da3b1c84a4171b40.jpg', media_type: 'image', caption: 'Vẻ đẹp lung linh của Cầu Rồng (Đà Nẵng) thu hút đông du khách tham quan.' },
          { media_id: 21, media_url: 'https://images2.thanhnien.vn/528068263637045248/2025/6/18/the-legend-danang-1-17502421275011965589401.jpg', media_type: 'image', caption: 'Cầu Rồng - Đà Nẵng: Biểu tượng đô thị hát khúc ca vươn ra biển lớn' },
          { media_id: 22, media_url: 'https://queenbus.com.vn/wp-content/uploads/2025/08/Cau-Rong-bieu-tuong-du-lich-Da-Nang-Anh-Suu-tam-1536x1024.png', media_type: 'image', caption: 'Cầu Rồng uy nga tráng lệ' },
        ]
        },
      {
        event_id: 104,
        event_name: 'Cầu Rồng - Lịch phun lửa, phun nước',
        start_date: '2013-06-01',
        description: 'Cầu Rồng bắt đầu lịch trình phun lửa và phun nước cố định vào 21:00 mỗi tối thứ Bảy, Chủ Nhật và các ngày lễ lớn, thu hút đông đảo người dân và du khách.',
        media: [
          { media_id: 23, media_url: 'https://media-cdn-v2.laodong.vn/Storage/NewsPortal/2022/8/6/1077782/Cau-Rong-3.jpg', media_type: 'image', caption: 'Cầu Rồng phun lửa' },
          { media_id: 24, media_url: 'https://cdn.tienphong.vn/images/a7a4eb175a75567c9a7ae09768d70948825233224bbb3af7a2c58a444211629e01c58c8cc499990dda1100612b4d9551c3b80aea932725123cdc20f046d0201b91c395aaa9493e5cdaf349cad3d4a15e/5a85c4cc54a344d6d65641730533d5bd.jpg', media_type: 'image', caption: 'Cầu Rồng phun nước' },

          { media_id: 204, media_url: 'https://youtu.be/UMrqcep-dUc?si=RrcMk-py4B8zWxoc', media_type: 'video', caption: 'Video Cầu Rồng phun lửa, phun nước', thumbnail_url: 'https://images2.thanhnien.vn/528068263637045248/2025/6/18/the-legend-danang-1-17502421275011965589401.jpg' }
        ]
      }, 
      {
        event_id: 105,
        event_name: 'Lễ hội pháo hoa quốc tế Đà Nẵng',
        description: 'Cầu Rồng là một trong những địa điểm đẹp nhất để ngắm pháo hoa ở Đà Nẵng, đặc biệt là trong Lễ hội Pháo hoa Quốc tế Đà Nẵng (DIFF). Cây cầu này không chỉ là địa điểm xem miễn phí với tầm nhìn bao quát mà còn mang lại trải nghiệm độc đáo nhờ hệ thống đèn LED rực rỡ hòa quyện với pháo hoa, tạo nên một khung cảnh huyền ảo. ',
        media: [
            { media_id: 26, media_url: 'https://media.vietravel.com/images/Content/dia-diem-ngam-phao-hoa-da-nang-2.jpg', media_type: 'image', caption: 'Chiêm ngưỡng pháo hoa trên Cầu Rồng' },
            { media_id: 27, media_url: 'https://danangfantasticity.com/tin-tuc/cau-rong-dung-phun-lua-nuoc-trong-le-hoi-phao-hoa-quoc-te', media_type: 'image', caption: 'Chiêm ngưỡng pháo hoa trên Cầu Rồng' },
            { media_id: 205, media_url: 'https://youtu.be/AoW8UsfrMRM?si=2ENVpCuPaebzzlXs', media_type: 'video', caption: 'Ngắm pháo hoa trên cầu Rồng', thumbnail_url: 'https://danangfantasticity.com/wp-content/uploads/2023/05/top-cac-dia-diem-xem-phao-hoa-da-nang-diff-2023-cuc-dinh-cau-rong.jpg' }

          ]
      }
    ]
  },
  {
    site_id: 4,
    site_name: 'Bảo tàng Điêu khắc Chăm',
    established_year: 1915,
    site_type: 'Bảo tàng', latitude: 16.060292, longitude: 108.223433, address: 'Hải Châu, Đà Nẵng', 
    status: 'Đang hoạt động', description:'Bảo tàng Điêu khắc Chăm Đà Nẵng là một bảo tàng lịch sử văn hóa quan trọng, trưng bày bộ sưu tập hiện vật điêu khắc Chăm Pa lớn nhất Việt Nam. Nơi đây lưu giữ hàng ngàn cổ vật quý giá từ các tháp Chăm, thành lũy thuộc duyên hải Nam Trung Bộ và các tỉnh Tây Nguyên. Bảo tàng được xây dựng theo kiến trúc pha trộn phong cách Pháp cổ điển và nét đặc trưng của Chăm Pa, với tòa nhà chính mang vẻ uy nghiêm, thanh thoát. ',
    additional_info: { 'Giá vé': '60.000 VNĐ/người/lượt', 'Giờ mở cửa': '7:00 - 17:00 hàng ngày' },
    events: [
      {
        event_id: 201,
        event_name: 'Thành lập bảo tàng',
        start_date: '1915',
        description: 'Bảo tàng được thành lập bởi Viện Viễn Đông Bác Cổ của Pháp, với sự đóng góp quan trọng của nhà khảo cổ học Henri Parmentier trong việc thu thập và bảo tồn các hiện vật của vương quốc Chăm Pa.',
        persons: [{ person_id: 2, full_name: 'Henri Parmentier'}],
        media: [
          { media_id: 3, media_url: 'https://statics.vinwonders.com/bao-tang-dieu-khac-cham-4_1631291259.jpg', media_type: 'image', caption: 'Công viên Tourane - nền móng của bảo tàng sau này' },
          { media_id: 4, media_url: 'https://statics.vinwonders.com/bao-tang-dieu-khac-cham-2_1631291155.jpg', media_type: 'image', caption: 'https://statics.vinwonders.com/bao-tang-dieu-khac-cham-2_1631291155.jpg' }
        ]
      }
    ]
  },

];

export const MOCK_PERSON_DETAILS: PersonDetail[] = [
    {
        person_id: 1,
        full_name: 'Nguyễn Bá Thanh',
        birth_year: 1953,
        death_year: 2015,
        biography: 'Ông Nguyễn Bá Thanh là một chính trị gia nổi tiếng của Việt Nam, người đã có những đóng góp to lớn cho sự phát triển vượt bậc của thành phố Đà Nẵng trong vai trò Chủ tịch UBND và Bí thư Thành ủy. Ông được người dân yêu mến bởi phong cách làm việc quyết liệt, dám nghĩ dám làm và những phát ngôn thẳng thắn.',
        additional_info: {
            'Quê quán': 'Xã Hòa Tiến, huyện Hòa Vang, thành phố Đà Nẵng',
            'Trình độ học vấn': 'Tiến sĩ Quản lý kinh tế nông nghiệp',
            'Lý luận chính trị': 'Cao cấp Lý luận chính trị',
            'Nghề nghiệp, chức vụ': 'Ủy viên BCH TW Đảng, Bí thư Thành ủy, Chủ tịch HĐND thành phố Đà nẵng, Trưởng Đoàn ĐBQH thành phố Đà Nẵng; Ủy viên Ủy ban Tài chính, Ngân sách của Quốc hội, Trưởng Ban Nội chính Trung ương'
        },
        media: [
            { media_id: 101, media_url: 'https://cdn2.tuoitre.vn/thumb_w/1100/471584752817336320/2024/12/19/base64-17346014260641578231263.jpeg', media_type: 'image', caption: 'Chân dung ông Nguyễn Bá Thanh' }
        ],
        events: [
            {
                event_id: 102,
                event_name: 'Giữ chức vụ Bí thư Thành ủy Đà Nẵng',
                start_date: '2003-01-01',
                description: 'Trong giai đoạn này, ông đã đưa ra nhiều quyết sách đột phá, góp phần thay đổi mạnh mẽ diện mạo đô thị và phát triển kinh tế - xã hội của Đà Nẵng, được người dân ghi nhận và yêu mến.'
            },
            {
                event_id: 101,
                event_name: 'Lễ khánh thành Cầu Rồng',
                start_date: '2013-03-29',
                description: 'Là một trong những công trình biểu tượng của Đà Nẵng được xây dựng và khánh thành dưới thời ông Nguyễn Bá Thanh làm lãnh đạo, thể hiện tầm nhìn và quyết tâm thay đổi diện mạo đô thị.',
                related_site_id: 1,
                related_site_name: 'Cầu Rồng',
                media: [
                    { media_id: 1001, media_url: 'https://thanhnien.mediacdn.vn/Uploaded/hoangnam/2016_05_16/ongnguyen_ba_thanh_ATFK.jpg', media_type: 'image', caption: 'Ông Nguyễn Bá Thanh' }
                ]
            }
        ]
    },
];