'use strict';

(() => {
  const tr = (vi, en) => ({ vi, en });
  const question = (promptVi, promptEn, optionsVi, optionsEn, answer, hintVi, hintEn, explanationVi, explanationEn) => ({
    type: 'choice',
    prompt: tr(promptVi, promptEn),
    options: { vi: optionsVi, en: optionsEn },
    answer,
    hint: tr(hintVi, hintEn),
    explanation: tr(explanationVi, explanationEn)
  });

  const episodes = [
    {
      title: tr('Nhiệm vụ 1 · Chuyến tàu đầu tiên', 'Mission 1 · The first train'),
      story: tr(
        'Bạn vừa đến Belle-Rive để tham gia tuần giao lưu văn hóa. Zoé, một tình nguyện viên địa phương, đang chuẩn bị Fête des Voisins (lễ hội hàng xóm). Hãy đọc tin nhắn để tìm điểm hẹn, rồi viết thư trả lời Zoé bằng tiếng Pháp.',
        'You have arrived in Belle-Rive for a week-long cultural exchange. Zoé, a local volunteer, is preparing the Fête des Voisins (the Neighbours’ Festival). Read her message to find the meeting details, then reply to Zoé in French.'
      ),
      readingTitle: tr('Thư chào mừng và thông báo nhà ga', 'A welcome message and a station notice'),
      readingIntro: tr('Đọc hai văn bản ngắn bằng tiếng Pháp. Hãy chú ý ai viết, giờ đến và điểm hẹn.', 'Read two short texts in French. Notice who wrote them, the arrival time, and the meeting place.'),
      sources: [
        {
          label: tr('Tin nhắn của Zoé', 'Message from Zoé'),
          paragraphs: [
            'Salut Linh ! Bienvenue à Belle-Rive !',
            'Ton train arrive samedi 20 juin à 14 h 20. Je t’attends devant la boulangerie, en face de la gare.',
            'La Fête des Voisins commence à 18 h dans la cour de l’école. Si tu as une question, écris-moi. À bientôt ! Zoé'
          ]
        },
        {
          label: tr('Thông báo nhà ga', 'Station notice'),
          paragraphs: ['GARE DE BELLE-RIVE — Samedi 20 juin : les trains arrivent voie 2. La boulangerie est en face de la gare.']
        }
      ],
      vocabulary: [
        ['la gare', 'nhà ga', 'train station'],
        ['devant', 'ở phía trước', 'in front of'],
        ['en face de', 'đối diện', 'opposite'],
        ['la voie', 'đường ray / sân ga', 'platform / track'],
        ['la cour', 'sân trong', 'courtyard']
      ],
      questions: [
        question('Zoé viết thư chủ yếu để làm gì?', 'What is Zoé’s message mainly about?', ['Chào mừng bạn và sắp xếp điểm hẹn.', 'Hủy lễ hội trong thị trấn.', 'Mời bạn đến nhà ga vào buổi tối.'], ['Welcoming you and arranging where to meet.', 'Cancelling the town festival.', 'Inviting you to the station in the evening.'], 0, 'Tìm lời chào “Bienvenue” và câu Zoé nói sẽ đợi bạn.', 'Look for “Bienvenue” and the sentence where Zoé says she will wait for you.', 'Zoé chào mừng bạn, cho biết điểm hẹn và thông tin về lễ hội.', 'Zoé welcomes you, gives the meeting place, and shares festival details.'),
        question('Tàu của bạn đến Belle-Rive lúc mấy giờ?', 'What time does your train arrive in Belle-Rive?', ['14 h 20', '14 h 30', '18 h'], ['14 h 20', '14 h 30', '18 h'], 0, 'Tìm câu bắt đầu bằng “Ton train arrive…”.', 'Find the sentence beginning “Ton train arrive…”.', 'Zoé viết: “Ton train arrive samedi 20 juin à 14 h 20.”', 'Zoé writes: “Ton train arrive samedi 20 juin à 14 h 20.”'),
        question('Bạn sẽ gặp Zoé ở đâu?', 'Where will you meet Zoé?', ['Trên sân ga số 2.', 'Trước tiệm bánh, đối diện nhà ga.', 'Trong sân trường.'], ['On platform 2.', 'In front of the bakery, opposite the station.', 'In the school courtyard.'], 1, 'Tìm cụm “devant la boulangerie”.', 'Look for “devant la boulangerie”.', 'Zoé viết: “Je t’attends devant la boulangerie, en face de la gare.”', 'Zoé writes: “Je t’attends devant la boulangerie, en face de la gare.”'),
        question('Các chuyến tàu đến trên sân ga nào?', 'Which platform will the trains arrive on?', ['Voie 1', 'Voie 2', 'Voie 3'], ['Voie 1', 'Voie 2', 'Voie 3'], 1, 'Đọc thông báo và tìm “Les trains arrivent…”.', 'Read the notice and find “Les trains arrivent…”.', 'Thông báo ghi: “Les trains arrivent voie 2.”', 'The notice says: “Les trains arrivent voie 2.”'),
        question('Fête des Voisins bắt đầu lúc nào và ở đâu?', 'When and where does the Fête des Voisins begin?', ['14 h 20, ở nhà ga.', '14 h 30, trước tiệm bánh.', '18 h, trong sân trường.'], ['14 h 20, at the station.', '14 h 30, in front of the bakery.', '18 h, in the school courtyard.'], 2, 'Tìm câu “La Fête des Voisins commence…”.', 'Find the sentence “La Fête des Voisins commence…”.', 'Zoé viết: “La Fête des Voisins commence à 18 h dans la cour de l’école.”', 'Zoé writes: “La Fête des Voisins commence à 18 h dans la cour de l’école.”')
      ],
      writing: {
        title: tr('Trả lời tin nhắn của Zoé', 'Reply to Zoé’s message'),
        prompt: tr('Viết khoảng 25–40 từ. Hãy chào Zoé, xác nhận ngày và giờ tàu đến, hỏi bạn cần mang gì đến lễ hội, rồi kết thư.', 'Write about 25–40 words. Greet Zoé, confirm your train’s arrival date and time, ask what you should bring to the festival, and sign off.'),
        requirements: [
          tr('Chào Zoé và xác nhận bạn sẽ đến.', 'Greet Zoé and confirm that you are coming.'),
          tr('Ghi ngày và giờ tàu đến.', 'Include your train’s arrival date and time.'),
          tr('Hỏi một câu về lễ hội và kết thư.', 'Ask one question about the festival and sign off.')
        ],
        review: [
          tr('Mình đã chào Zoé và kết thư.', 'I greeted Zoé and signed off.'),
          tr('Mình đã ghi ngày và giờ tàu đến.', 'I included the train’s arrival date and time.'),
          tr('Mình đã đặt một câu hỏi về lễ hội.', 'I asked one question about the festival.'),
          tr('Tin nhắn dễ hiểu; mình đã kiểm tra từ quen thuộc.', 'My message is easy to understand; I checked familiar words.')
        ],
        phrases: [
          ['Merci pour ton message.', 'Cảm ơn bạn đã nhắn tin.', 'Thanks for your message.'],
          ['Mon train arrive…', 'Tàu của mình đến…', 'My train arrives…'],
          ['Qu’est-ce que je dois apporter ?', 'Mình cần mang theo gì?', 'What should I bring?'],
          ['À bientôt !', 'Hẹn gặp lại!', 'See you soon!']
        ],
        sample: 'Salut Zoé ! Merci pour ton message. Mon train arrive samedi 20 juin à 14 h 20. Je te retrouve devant la boulangerie. Qu’est-ce que je dois apporter pour la fête ? À bientôt, Linh.',
        end: tr('Bạn đã tìm được điểm hẹn và trả lời Zoé. Cùng khám phá khu phố nhé!', 'You found the meeting place and replied to Zoé. Let’s explore the neighbourhood!')
      }
    },
    {
      title: tr('Nhiệm vụ 2 · Lời mời đến khu phố', 'Mission 2 · An invitation to the neighbourhood'),
      story: tr('Zoé nhờ bạn giúp mời hàng xóm đến Fête des Voisins. Đọc áp phích và tờ thông tin để biết mọi người sẽ gặp nhau ở đâu, khi nào và cần chuẩn bị gì.', 'Zoé asks you to help invite the neighbours to the Fête des Voisins. Read the poster and activity notice to find out where and when everyone will meet and what to bring.'),
      readingTitle: tr('Áp phích và chương trình hoạt động', 'A festival poster and activity notice'),
      readingIntro: tr('Tìm thông tin chính trên áp phích, sau đó đối chiếu với lịch hoạt động.', 'Find the key information on the poster, then check it against the activity schedule.'),
      sources: [
        {
          label: tr('Áp phích lễ hội', 'Festival poster'),
          paragraphs: [
            'FÊTE DES VOISINS — Vendredi 26 juin, à partir de 18 h, dans la cour de l’école.',
            'Chacun apporte un plat à partager. Entrée gratuite. Apportez une assiette et un verre !'
          ]
        },
        {
          label: tr('Hoạt động trong khu phố', 'Neighbourhood activities'),
          paragraphs: [
            '16 h : musique et jeux, place de la mairie.',
            '18 h : repas partagé, cour de l’école. En cas de pluie, rendez-vous à la salle des fêtes.'
          ]
        }
      ],
      vocabulary: [
        ['à partir de', 'bắt đầu từ', 'starting at'],
        ['chacun', 'mỗi người', 'everyone / each person'],
        ['un plat à partager', 'món ăn để cùng chia sẻ', 'a dish to share'],
        ['entrée gratuite', 'vào cửa miễn phí', 'free entry'],
        ['en cas de pluie', 'nếu trời mưa', 'in case of rain']
      ],
      questions: [
        question('Mục đích chính của áp phích là gì?', 'What is the main purpose of the poster?', ['Thông báo về một bữa tiệc trong khu phố.', 'Bán đồ ăn ở nhà ga.', 'Mời mọi người đi xem phim.'], ['To announce a neighbourhood party.', 'To sell food at the station.', 'To invite people to a film.'], 0, 'Tìm tên sự kiện và từ “repas partagé”.', 'Look for the event name and the words “repas partagé”.', 'Áp phích thông báo Fête des Voisins và bữa ăn chung.', 'The poster announces the Fête des Voisins and a shared meal.'),
        question('Lễ hội bắt đầu ngày nào và lúc mấy giờ?', 'When does the festival begin?', ['Thứ Sáu, ngày 26 tháng 6 lúc 18 giờ.', 'Thứ Bảy, ngày 27 tháng 6 lúc 16 giờ.', 'Chủ Nhật lúc 11 giờ.'], ['Friday, 26 June at 6 p.m.', 'Saturday, 27 June at 4 p.m.', 'Sunday at 11 a.m.'], 0, 'Tìm dòng bắt đầu bằng “Vendredi 26 juin”.', 'Find the line beginning “Vendredi 26 juin”.', 'Áp phích ghi: “Vendredi 26 juin, à partir de 18 h.”', 'The poster says: “Vendredi 26 juin, à partir de 18 h.”'),
        question('Mỗi người nên mang gì?', 'What should each person bring?', ['Một tấm vé và một quyển sách.', 'Một món ăn để chia sẻ.', 'Một chiếc ô và một tấm bản đồ.'], ['A ticket and a book.', 'A dish to share.', 'An umbrella and a map.'], 1, 'Tìm cụm “Chacun apporte…”.', 'Look for “Chacun apporte…”.', 'Áp phích nói: “Chacun apporte un plat à partager.”', 'The poster says: “Chacun apporte un plat à partager.”'),
        question('Lễ hội có thu phí vào cửa không?', 'Is there an entrance fee?', ['Không, vào cửa miễn phí.', 'Có, nhưng chỉ sau 18 giờ.', 'Chỉ miễn phí cho trẻ em.'], ['No, entry is free.', 'Yes, but only after 6 p.m.', 'Only children enter for free.'], 0, 'Tìm cụm “Entrée gratuite”.', 'Look for “Entrée gratuite”.', '“Entrée gratuite” nghĩa là vào cửa miễn phí.', '“Entrée gratuite” means entry is free.')
      ],
      writing: {
        title: tr('Mời một người bạn đến lễ hội', 'Invite a friend to the festival'),
        prompt: tr('Viết khoảng 35–45 từ cho Camille. Mời bạn ấy đến Fête des Voisins, ghi ngày, giờ và địa điểm, nói mọi người sẽ làm gì, rồi nhắc mang một món ăn.', 'Write about 35–45 words to Camille. Invite them to the Fête des Voisins, include the date, time, and place, say what people will do, and remind them to bring a dish.'),
        requirements: [
          tr('Nêu lời mời và người nhận.', 'Make the invitation clear and address your friend.'),
          tr('Ghi đủ ngày, giờ và địa điểm.', 'Include the date, time, and place.'),
          tr('Nói về hoạt động và món cần mang.', 'Mention the activity and what to bring.')
        ],
        review: [
          tr('Mình đã viết lời mời rõ ràng.', 'My invitation is clear.'),
          tr('Ngày, giờ và địa điểm đều chính xác.', 'The date, time, and place are all included.'),
          tr('Mình đã dùng lời nhắn thân mật phù hợp.', 'I used an appropriate friendly tone.'),
          tr('Mình đã nối ý bằng từ quen thuộc như et hoặc parce que.', 'I connected ideas with familiar words such as et or parce que.')
        ],
        phrases: [
          ['Tu veux venir… ?', 'Bạn muốn đến… không?', 'Would you like to come…?'],
          ['La fête commence à…', 'Lễ hội bắt đầu lúc…', 'The party starts at…'],
          ['On va écouter de la musique.', 'Chúng ta sẽ nghe nhạc.', 'We are going to listen to music.'],
          ['Apporte un plat à partager.', 'Hãy mang một món ăn để chia sẻ.', 'Bring a dish to share.']
        ],
        sample: 'Salut Camille ! Tu veux venir à la Fête des Voisins vendredi 26 juin ? La fête commence à 18 h dans la cour de l’école. On va écouter de la musique et partager le repas. Apporte un plat, si tu peux. J’espère que tu seras là ! À bientôt, Linh.',
        end: tr('Lời mời đã sẵn sàng! Zoé chuyển sang việc chuẩn bị cho phiên chợ cuối tuần.', 'The invitation is ready! Zoé moves on to preparing for the weekend market.')
      }
    },
    {
      title: tr('Nhiệm vụ 3 · Phiên chợ thứ Bảy', 'Mission 3 · The Saturday market'),
      story: tr('Phiên chợ là nơi mọi người mua thức ăn và gặp gỡ bạn bè. Zoé gửi thực đơn cùng giờ mở cửa. Hãy tìm giá cả, giờ và địa điểm để hẹn Camille đi chợ.', 'The market is where people buy food and meet friends. Zoé sends you a menu and opening hours. Find the prices, times, and location so you can arrange to meet Camille there.'),
      readingTitle: tr('Lịch chợ và thực đơn', 'Market hours and a menu'),
      readingIntro: tr('Đọc giờ mở cửa và tìm thông tin cụ thể trên thực đơn.', 'Read the opening hours and find specific details on the menu.'),
      sources: [
        {
          label: tr('Thông báo phiên chợ', 'Market notice'),
          paragraphs: [
            'MARCHÉ DU SAMEDI — samedi 27 juin, de 8 h à 13 h, place du Marché.',
            'Le stand de fruits est près de l’entrée. La boulangerie est à côté du café.'
          ]
        },
        {
          label: tr('Thực đơn của quầy ăn', 'Food stall menu'),
          paragraphs: [
            'Une baguette : 1,20 € · Une pomme : 0,50 €',
            'Un sandwich au fromage : 3,50 € · Une bouteille d’eau : 1 €',
            'Le menu est servi de 9 h à 12 h. Paiement en espèces.'
          ]
        }
      ],
      vocabulary: [
        ['de… à…', 'từ… đến…', 'from… to…'],
        ['à côté de', 'bên cạnh', 'next to'],
        ['un stand', 'quầy hàng', 'a stall'],
        ['en espèces', 'bằng tiền mặt', 'in cash'],
        ['combien coûte… ?', '… giá bao nhiêu?', 'how much does… cost?']
      ],
      questions: [
        question('Phiên chợ diễn ra ở đâu?', 'Where does the market take place?', ['Place du Marché.', 'Dans la cour de l’école.', 'À la gare.'], ['Place du Marché.', 'In the school courtyard.', 'At the train station.'], 0, 'Tìm phần ghi địa điểm sau ngày và giờ.', 'Find the location after the date and time.', 'Thông báo ghi “place du Marché”.', 'The notice says “place du Marché”.'),
        question('Phiên chợ mở cửa từ mấy giờ đến mấy giờ?', 'What are the market opening hours?', ['Từ 9 giờ đến 12 giờ.', 'Từ 8 giờ đến 13 giờ.', 'Từ 16 giờ đến 18 giờ.'], ['From 9 a.m. to noon.', 'From 8 a.m. to 1 p.m.', 'From 4 p.m. to 6 p.m.'], 1, 'Phân biệt giờ của phiên chợ với giờ phục vụ thực đơn.', 'Distinguish the market hours from the menu service hours.', 'Phiên chợ mở từ 8 h đến 13 h; thực đơn chỉ phục vụ từ 9 h đến 12 h.', 'The market is open from 8 h to 13 h; the menu is served only from 9 h to 12 h.'),
        question('Một chiếc bánh mì baguette giá bao nhiêu?', 'How much does one baguette cost?', ['1,20 €', '0,50 €', '3,50 €'], ['1,20 €', '0,50 €', '3,50 €'], 0, 'Tìm dòng có từ “baguette”.', 'Find the line with “baguette”.', 'Thực đơn ghi: “Une baguette : 1,20 €.”', 'The menu says: “Une baguette : 1,20 €.”'),
        question('Bạn phải trả tiền bằng cách nào?', 'How do you need to pay?', ['Bằng thẻ.', 'Bằng tiền mặt.', 'Không cần trả tiền.'], ['By card.', 'In cash.', 'No payment is needed.'], 1, 'Tìm dòng cuối của thực đơn.', 'Look at the last line of the menu.', '“Paiement en espèces” nghĩa là trả bằng tiền mặt.', '“Paiement en espèces” means payment in cash.')
      ],
      writing: {
        title: tr('Hẹn gặp ở phiên chợ', 'Arrange to meet at the market'),
        prompt: tr('Viết khoảng 40–50 từ cho Camille. Hẹn giờ và địa điểm gặp ở chợ, nói bạn muốn mua món gì và giá bao nhiêu, rồi hỏi Camille thích món nào.', 'Write about 40–50 words to Camille. Suggest a time and meeting place at the market, say what you want to buy and its price, then ask what Camille likes.'),
        form: {
          title: tr('Phiếu đặt món', 'Order form'),
          prompt: tr('Điền phiếu bằng tiếng Pháp: khách hàng là Linh; đặt một sandwich phô mai và một chai nước; nhận lúc 11 giờ 30.', 'Complete the form in French: the customer is Linh; order one cheese sandwich and one bottle of water; collect the order at 11:30.'),
          fields: [
            { label: tr('Nom du client · Tên khách hàng', 'Nom du client · Customer name'), placeholder: tr('Linh', 'Linh') },
            { label: tr('Commande · Món đặt', 'Commande · Order'), placeholder: tr('1 sandwich au fromage + 1 bouteille d’eau', '1 sandwich au fromage + 1 bouteille d’eau') },
            { label: tr('Quantité · Số lượng', 'Quantité · Quantity'), placeholder: tr('Une unité de chaque', 'One of each') },
            { label: tr('Heure de retrait · Giờ nhận', 'Heure de retrait · Pick-up time'), placeholder: tr('11 h 30', '11 h 30') }
          ]
        },
        requirements: [
          tr('Đề xuất một giờ và địa điểm gặp.', 'Suggest a time and meeting place.'),
          tr('Nêu ít nhất một món và giá của món đó.', 'Mention at least one item and its price.'),
          tr('Hỏi Camille về sở thích hoặc lựa chọn.', 'Ask Camille about a preference or choice.')
        ],
        review: [
          tr('Mình đã nêu rõ giờ và nơi gặp.', 'I clearly gave a time and place to meet.'),
          tr('Mình đã viết đúng món và giá.', 'I included an item and its correct price.'),
          tr('Mình đã hỏi một câu phù hợp.', 'I asked a relevant question.'),
          tr('Mình đã kiểm tra số, giờ và cách viết giá.', 'I checked the numbers, times, and price format.')
        ],
        phrases: [
          ['On se retrouve à…', 'Chúng ta gặp nhau lúc/ở…', 'Let’s meet at…'],
          ['Je voudrais acheter…', 'Mình muốn mua…', 'I would like to buy…'],
          ['Ça coûte…', 'Món đó giá…', 'It costs…'],
          ['Tu préfères… ?', 'Bạn thích… hơn không?', 'Do you prefer…?']
        ],
        sample: 'Salut Camille ! On se retrouve samedi à 10 h devant le stand de fruits, place du Marché ? Je voudrais acheter des pommes : elles coûtent 0,50 € chacune. Après, on peut prendre un sandwich au fromage. Tu préfères le fromage ou les fruits ? À bientôt, Linh.',
        end: tr('Bạn đã hẹn được ở chợ. Một thay đổi thời tiết sẽ khiến nhóm phải đổi kế hoạch.', 'You arranged to meet at the market. A change in the weather will make the group adjust its plans.')
      }
    },
    {
      title: tr('Nhiệm vụ 4 · Kế hoạch thay đổi', 'Mission 4 · A change of plans'),
      story: tr('Trời mưa lớn và bữa tiệc ngoài sân không thể diễn ra như dự định. Đọc tin nhắn mới của Zoé để biết kế hoạch thay thế, sau đó trả lời lịch sự nếu bạn không đến được đúng giờ.', 'Heavy rain means the outdoor party cannot happen as planned. Read Zoé’s update to learn the new plan, then reply politely if you cannot arrive at the suggested time.'),
      readingTitle: tr('Tin nhắn về một sự cố nhỏ', 'A message about a small problem'),
      readingIntro: tr('Tìm lý do thay đổi, kế hoạch mới và việc Zoé cần bạn giúp.', 'Find the reason for the change, the new plan, and what Zoé needs you to do.'),
      sources: [
        {
          label: tr('Tin nhắn trong nhóm', 'Group message'),
          paragraphs: [
            'Bonjour tout le monde ! Il pleut beaucoup aujourd’hui. Nous ne pouvons pas faire la fête dans la cour.',
            'La fête aura lieu demain, dimanche 28 juin à 11 h, dans la salle des fêtes. Apportez le gâteau à l’intérieur.',
            'Linh, peux-tu prévenir Camille ? Merci ! Zoé'
          ]
        },
        {
          label: tr('Chỉ dẫn đến địa điểm mới', 'Directions to the new venue'),
          paragraphs: ['La salle des fêtes se trouve derrière la mairie. Entrez par la grande porte bleue.']
        }
      ],
      vocabulary: [
        ['il pleut', 'trời mưa', 'it is raining'],
        ['avoir lieu', 'diễn ra', 'to take place'],
        ['prévenir quelqu’un', 'báo cho ai', 'to let someone know'],
        ['derrière', 'phía sau', 'behind'],
        ['peux-tu… ?', 'bạn có thể… không?', 'can you…?']
      ],
      questions: [
        question('Vì sao kế hoạch ban đầu thay đổi?', 'Why has the original plan changed?', ['Vì trời mưa nhiều.', 'Vì Zoé bị ốm.', 'Vì nhà ga đóng cửa.'], ['Because it is raining heavily.', 'Because Zoé is ill.', 'Because the station is closed.'], 0, 'Tìm câu đầu tiên trong tin nhắn.', 'Look at the first sentence in the message.', 'Zoé viết “Il pleut beaucoup aujourd’hui.”', 'Zoé writes “Il pleut beaucoup aujourd’hui.”'),
        question('Bữa tiệc diễn ra lúc nào theo kế hoạch mới?', 'When will the party take place under the new plan?', ['Hôm nay lúc 18 giờ.', 'Ngày mai, Chủ Nhật 28 tháng 6 lúc 11 giờ.', 'Thứ Bảy tuần sau lúc 9 giờ.'], ['Today at 6 p.m.', 'Tomorrow, Sunday 28 June at 11 a.m.', 'Next Saturday at 9 a.m.'], 1, 'Tìm “demain, dimanche 28 juin”.', 'Find “demain, dimanche 28 juin”.', 'Tin nhắn ghi bữa tiệc diễn ra ngày mai lúc 11 h.', 'The message says the party takes place tomorrow at 11 h.'),
        question('Zoé nhờ Linh làm gì?', 'What does Zoé ask Linh to do?', ['Mang một chiếc bàn đến nhà ga.', 'Báo cho Camille biết.', 'Mua vé vào cửa.'], ['Bring a table to the station.', 'Let Camille know.', 'Buy an entrance ticket.'], 1, 'Tìm câu có tên Linh.', 'Find the sentence with Linh’s name.', 'Zoé hỏi: “Linh, peux-tu prévenir Camille ?”', 'Zoé asks: “Linh, peux-tu prévenir Camille ?”'),
        question('Phòng hội trường nằm ở đâu?', 'Where is the community hall?', ['Phía sau tòa thị chính.', 'Đối diện tiệm bánh.', 'Bên trong nhà ga.'], ['Behind the town hall.', 'Opposite the bakery.', 'Inside the train station.'], 0, 'Đọc phần chỉ dẫn đến địa điểm mới.', 'Read the directions to the new venue.', 'Chỉ dẫn ghi “derrière la mairie”.', 'The directions say “derrière la mairie”.')
      ],
      writing: {
        title: tr('Xin lỗi và đề xuất một giờ khác', 'Apologize and suggest another time'),
        prompt: tr('Bạn có hẹn gia đình vào Chủ Nhật buổi sáng. Viết khoảng 45–55 từ cho Zoé: xin lỗi, giải thích vì sao bạn không đến lúc 11 giờ, đề xuất đến lúc 14 giờ để giúp dọn bàn, và hỏi Zoé có đồng ý không.', 'You have a family appointment on Sunday morning. Write about 45–55 words to Zoé: apologize, explain why you cannot come at 11, suggest arriving at 2 p.m. to help set the tables, and ask if that works for her.'),
        requirements: [
          tr('Xin lỗi và giải thích ngắn gọn lý do.', 'Apologize and briefly explain why.'),
          tr('Đề xuất một giờ khác và một việc có thể giúp.', 'Suggest another time and a task you can help with.'),
          tr('Dùng lời nhắn lịch sự phù hợp với Zoé.', 'Use a polite tone that suits Zoé.')
        ],
        review: [
          tr('Mình đã nói rõ mình không đến lúc 11 giờ.', 'I clearly explained that I cannot arrive at 11.'),
          tr('Mình đã xin lỗi và nêu lý do.', 'I apologized and gave a reason.'),
          tr('Mình đã đề xuất một giờ và việc giúp cụ thể.', 'I suggested a specific time and way to help.'),
          tr('Mình đã kết thư phù hợp.', 'I used an appropriate closing.')
        ],
        phrases: [
          ['Je suis désolé(e), mais…', 'Mình xin lỗi, nhưng…', 'I’m sorry, but…'],
          ['Je ne peux pas venir à…', 'Mình không thể đến lúc…', 'I can’t come at…'],
          ['Parce que…', 'Bởi vì…', 'Because…'],
          ['Je peux arriver à…', 'Mình có thể đến lúc…', 'I can arrive at…']
        ],
        sample: 'Bonjour Zoé ! Je suis désolée, mais je ne peux pas venir à 11 h parce que j’ai un rendez-vous avec ma famille. Est-ce que je peux arriver à 14 h ? Je peux aider à installer les tables et ranger la salle. Dis-moi si cela te convient. Merci et à dimanche, Linh.',
        end: tr('Zoé đồng ý đổi giờ. Cả nhóm bắt đầu phân công công việc cho lễ hội.', 'Zoé agrees to the new time. The group starts assigning festival tasks.')
      }
    },
    {
      title: tr('Nhiệm vụ 5 · Mọi người cùng giúp', 'Mission 5 · Everyone helps'),
      story: tr('Các tình nguyện viên đang phân chia việc chuẩn bị. Hãy đọc danh sách, nhận ra từng người qua công việc và mô tả, rồi viết tin nhắn xác nhận phần việc của bạn.', 'The volunteers are dividing up the preparations. Read the list, identify people by their jobs and descriptions, then write a message confirming your task.'),
      readingTitle: tr('Danh sách tình nguyện viên và sơ đồ', 'A volunteer list and a location note'),
      readingIntro: tr('Ghép người với nhiệm vụ, đọc giờ theo thứ tự và tìm vị trí của căn phòng.', 'Match people to their tasks, follow the times in order, and find the room location.'),
      sources: [
        {
          label: tr('Phân công chuẩn bị', 'Preparation schedule'),
          paragraphs: [
            'Minh, étudiant aux cheveux noirs : installe les tables à 9 h.',
            'Camille, boulangère aux cheveux courts : apporte le pain à 9 h 30.',
            'Nora, professeure aux cheveux longs : prépare les jeux à 10 h.'
          ]
        },
        {
          label: tr('Ghi chú địa điểm', 'Location note'),
          paragraphs: ['La salle des fêtes est derrière la mairie. Les assiettes sont dans le placard près de la porte.']
        }
      ],
      vocabulary: [
        ['étudiant / étudiante', 'sinh viên', 'student'],
        ['boulanger / boulangère', 'thợ làm bánh', 'baker'],
        ['professeur / professeure', 'giáo viên', 'teacher'],
        ['aux cheveux longs / courts', 'tóc dài / tóc ngắn', 'with long / short hair'],
        ['un placard', 'tủ đựng đồ', 'a cupboard']
      ],
      questions: [
        question('Ai sẽ mang bánh mì?', 'Who will bring the bread?', ['Minh.', 'Camille.', 'Nora.'], ['Minh.', 'Camille.', 'Nora.'], 1, 'Tìm từ “apporte le pain”.', 'Look for “apporte le pain”.', 'Camille, boulangère, apporte le pain à 9 h 30.', 'Camille, the baker, brings the bread at 9 h 30.'),
        {
          type: 'matching',
          prompt: tr('Ghép mỗi tình nguyện viên với công việc của họ.', 'Match each volunteer with their task.'),
          rows: [
            { label: tr('Minh', 'Minh'), answer: 0 },
            { label: tr('Camille', 'Camille'), answer: 1 },
            { label: tr('Nora', 'Nora'), answer: 2 }
          ],
          options: {
            vi: ['Lắp bàn lúc 9 giờ.', 'Mang bánh mì lúc 9 giờ 30.', 'Chuẩn bị trò chơi lúc 10 giờ.'],
            en: ['Set up the tables at 9.', 'Bring the bread at 9:30.', 'Prepare the games at 10.']
          },
          hint: tr('Tìm động từ sau tên của từng người: installe, apporte, prépare.', 'Look for the verb after each name: installe, apporte, prépare.'),
          explanation: tr('Minh lắp bàn, Camille mang bánh mì, còn Nora chuẩn bị trò chơi.', 'Minh sets the tables, Camille brings the bread, and Nora prepares the games.')
        },
        question('Việc nào diễn ra đầu tiên?', 'Which task happens first?', ['Chuẩn bị trò chơi.', 'Mang bánh mì.', 'Lắp bàn.'], ['Prepare the games.', 'Bring the bread.', 'Set up the tables.'], 2, 'So sánh ba giờ: 9 h, 9 h 30 và 10 h.', 'Compare the three times: 9 h, 9 h 30, and 10 h.', 'Lắp bàn lúc 9 h, sớm hơn hai việc còn lại.', 'The tables are set up at 9 h, before the other two tasks.'),
        question('Đĩa ăn ở đâu?', 'Where are the plates?', ['Trong tủ gần cửa.', 'Ở sân ga số 2.', 'Trong tiệm bánh.'], ['In the cupboard near the door.', 'On platform 2.', 'In the bakery.'], 0, 'Đọc câu thứ hai trong ghi chú địa điểm.', 'Read the second sentence in the location note.', 'Ghi chú nói: “Les assiettes sont dans le placard près de la porte.”', 'The note says: “Les assiettes sont dans le placard près de la porte.”')
      ],
      writing: {
        title: tr('Xác nhận phần việc của bạn', 'Confirm your volunteer task'),
        prompt: tr('Viết khoảng 45–55 từ cho Zoé. Xác nhận bạn sẽ mang cốc đến lúc 9 giờ 30, hỏi cốc ở đâu, rồi đề nghị giúp thêm một việc sau khi sắp xếp bàn.', 'Write about 45–55 words to Zoé. Confirm that you will bring cups at 9:30, ask where they are, then offer to help with another task after the tables are set up.'),
        requirements: [
          tr('Xác nhận nhiệm vụ và giờ cụ thể.', 'Confirm the task and a specific time.'),
          tr('Đặt câu hỏi về vị trí cốc.', 'Ask where the cups are.'),
          tr('Đề nghị giúp thêm bằng một câu đơn giản.', 'Offer additional help in a simple sentence.')
        ],
        review: [
          tr('Mình đã ghi việc cần làm và giờ.', 'I included the task and time.'),
          tr('Mình đã đặt câu hỏi rõ ràng.', 'I asked a clear question.'),
          tr('Mình đã dùng từ nối hoặc trình tự dễ hiểu.', 'I used a connector or clear sequence.'),
          tr('Mình đã kiểm tra danh từ và tính từ số ít/số nhiều.', 'I checked singular and plural nouns and adjectives.')
        ],
        phrases: [
          ['Je peux apporter…', 'Mình có thể mang…', 'I can bring…'],
          ['Où se trouve… ?', '… ở đâu?', 'Where is…?'],
          ['Après, je peux aider à…', 'Sau đó, mình có thể giúp…', 'Afterwards, I can help…'],
          ['Il faut…', 'Cần phải…', 'We need to…']
        ],
        sample: 'Bonjour Zoé ! Je confirme : je peux apporter les gobelets dimanche à 9 h 30. Où sont-ils ? Je peux les prendre dans le placard près de la porte. Après avoir installé les tables, je peux aussi aider Nora avec les jeux. Est-ce que cela te va ? À bientôt, Linh.',
        end: tr('Mọi thứ đã sẵn sàng. Sau lễ hội, Zoé sẽ kể lại những khoảnh khắc đáng nhớ.', 'Everything is ready. After the festival, Zoé will share some favourite memories.')
      }
    },
    {
      title: tr('Nhiệm vụ 6 · Một tấm bưu thiếp đáng nhớ', 'Mission 6 · A postcard to remember'),
      story: tr('Lễ hội đã kết thúc. Zoé gửi một tấm bưu thiếp kể về những gì đã xảy ra và điều cô ấy yêu thích. Đọc để theo dõi các sự kiện, rồi viết về trải nghiệm của bạn.', 'The festival is over. Zoé sends a postcard about what happened and what she enjoyed. Read to follow the events, then write about your own experience.'),
      readingTitle: tr('Bưu thiếp sau lễ hội', 'A postcard after the festival'),
      readingIntro: tr('Chú ý các sự kiện đã xảy ra, cảm xúc của Zoé và lý do cô ấy thích buổi tối.', 'Notice what happened, how Zoé felt, and why she enjoyed the evening.'),
      sources: [
        {
          label: tr('Bưu thiếp của Zoé', 'Postcard from Zoé'),
          paragraphs: [
            'Salut Linh ! Merci pour ton aide dimanche.',
            'Il faisait beau et les voisins sont arrivés à 11 h. Nous avons installé les tables, puis les enfants ont joué dans la cour.',
            'J’ai adoré le repas parce que chacun a apporté une spécialité de son pays. La musique était très agréable ! À bientôt, Zoé'
          ]
        },
        {
          label: tr('Bảng chương trình', 'Programme'),
          paragraphs: [
            '11 h : accueil des voisins · 12 h : repas partagé',
            '14 h : jeux et musique · 16 h : rangement de la salle'
          ]
        }
      ],
      vocabulary: [
        ['il faisait beau', 'trời đẹp', 'the weather was nice'],
        ['nous avons installé', 'chúng tôi đã sắp xếp', 'we set up'],
        ['puis', 'sau đó', 'then'],
        ['j’ai adoré', 'mình rất thích', 'I loved'],
        ['une spécialité', 'món đặc sản', 'a speciality']
      ],
      questions: [
        question('Bưu thiếp này chủ yếu làm gì?', 'What is the main purpose of this postcard?', ['Kể lại lễ hội và cảm ơn Linh.', 'Hủy một buổi hẹn ở nhà ga.', 'Bán vé cho buổi hòa nhạc.'], ['To describe the festival and thank Linh.', 'To cancel a meeting at the station.', 'To sell concert tickets.'], 0, 'Đọc lời chào và câu cảm ơn ở đầu thư.', 'Read the greeting and thank-you at the start.', 'Zoé cảm ơn Linh và kể về buổi lễ hội.', 'Zoé thanks Linh and describes the festival.'),
        question('Sau khi lắp bàn, trẻ em làm gì?', 'What did the children do after the tables were set up?', ['Ăn sáng ở nhà ga.', 'Chơi trong sân.', 'Đi chợ.'], ['Have breakfast at the station.', 'Play in the courtyard.', 'Go to the market.'], 1, 'Tìm từ nối “puis”.', 'Look for the connector “puis”.', 'Zoé viết: “puis les enfants ont joué dans la cour.”', 'Zoé writes: “puis les enfants ont joué dans la cour.”'),
        question('Vì sao Zoé rất thích bữa ăn?', 'Why did Zoé love the meal?', ['Mọi người mang đặc sản từ đất nước mình.', 'Trời mưa suốt buổi tối.', 'Có một nhà hàng mới.'], ['Everyone brought a speciality from their country.', 'It rained all evening.', 'There was a new restaurant.'], 0, 'Tìm câu có “J’ai adoré… parce que”.', 'Find the sentence with “J’ai adoré… parce que”.', 'Zoé thích bữa ăn vì mọi người mang món đặc sản của đất nước mình.', 'Zoé liked the meal because everyone brought a speciality from their country.'),
        question('Buổi dọn dẹp bắt đầu lúc mấy giờ?', 'What time does tidying up begin?', ['12 h', '14 h', '16 h'], ['12 h', '14 h', '16 h'], 2, 'Tìm dòng có từ “rangement”.', 'Find the line with “rangement”.', 'Chương trình ghi: “16 h : rangement de la salle.”', 'The programme says: “16 h : rangement de la salle.”')
      ],
      writing: {
        title: tr('Kể về trải nghiệm của bạn', 'Write about your experience'),
        prompt: tr('Viết ít nhất 60 từ cho một người bạn. Kể lại một hoạt động trong tuần giao lưu, nói bạn thích hoặc không thích điều gì và giải thích vì sao. Dùng trình tự dễ hiểu, lời chào và lời kết.', 'Write at least 60 words to a friend. Describe one activity from the exchange week, say what you liked or disliked and explain why. Use a clear sequence, greeting, and closing.'),
        requirements: [
          tr('Kể ít nhất một việc đã xảy ra.', 'Describe at least one thing that happened.'),
          tr('Nêu ý kiến và giải thích bằng parce que hoặc từ nối khác.', 'Give an opinion and explain it with parce que or another connector.'),
          tr('Dùng thì quá khứ phù hợp và kết thư.', 'Use a suitable past form and sign off.')
        ],
        review: [
          tr('Mình đã viết đủ ít nhất 60 từ.', 'I wrote at least 60 words.'),
          tr('Các ý được sắp xếp theo trình tự.', 'My ideas are in a clear order.'),
          tr('Mình đã nêu cảm nhận và lý do.', 'I gave an opinion and a reason.'),
          tr('Mình đã kiểm tra passé composé, từ nối và chính tả quen thuộc.', 'I checked passé composé, connectors, and familiar spelling.')
        ],
        phrases: [
          ['Le week-end dernier, nous avons…', 'Cuối tuần trước, chúng mình đã…', 'Last weekend, we…'],
          ['Il faisait…', 'Thời tiết lúc đó…', 'The weather was…'],
          ['J’ai aimé… parce que…', 'Mình thích… bởi vì…', 'I liked… because…'],
          ['D’abord… puis…', 'Đầu tiên… sau đó…', 'First… then…']
        ],
        sample: 'Salut Mai ! Dimanche, j’ai participé à la fête de Belle-Rive. Il faisait beau et la cour était pleine de voisins. D’abord, nous avons installé les tables, puis les enfants ont joué et nous avons partagé le repas. J’ai beaucoup aimé les spécialités des autres pays parce qu’elles étaient délicieuses. La musique était aussi très agréable. J’ai passé une excellente journée et j’ai rencontré de nouveaux amis. À bientôt, Linh.',
        end: tr('Bạn đã hoàn thành câu chuyện Belle-Rive! Hãy thử bài tổng ôn để luyện các dạng đọc và viết trong cùng một lượt.', 'You have completed the Belle-Rive story! Try the final review to practise reading and writing tasks together.')
      }
    }
  ];

  const review = {
    readingTitle: tr('Bài tổng ôn · Đọc hiểu', 'Final review · Reading'),
    readingIntro: tr('Bốn bài đọc ngắn nguyên bản. Hãy xác định loại văn bản, người viết, mục đích và các chi tiết quan trọng; chọn bằng chứng trong văn bản khi được hỏi.', 'Four original reading exercises. Identify the text type, writer, purpose, and key details; select evidence from the text when asked.'),
    exercises: [
      {
        title: tr('Bài đọc 1 / 4 · Thông báo công cộng', 'Reading 1 / 4 · Public notice'),
        sources: [{
          label: tr('Thông báo câu lạc bộ', 'Club notice'),
          paragraphs: ['CLUB VÉLO DE BELLE-RIVE — Balade dimanche 5 juillet.', 'Départ à 9 h devant la mairie. Retour à 12 h. Apportez de l’eau. Inscription gratuite au centre culturel.']
        }],
        questions: [
          question('Thông báo này dành cho hoạt động nào?', 'What activity is this notice about?', ['Một chuyến đạp xe.', 'Một buổi xem phim.', 'Một phiên chợ.'], ['A bike ride.', 'A film screening.', 'A market.'], 0, 'Tìm tên câu lạc bộ trong tiêu đề.', 'Look at the club name in the heading.', '“Club vélo” là câu lạc bộ xe đạp.', '“Club vélo” means a cycling club.'),
          question('Người tham gia cần làm gì?', 'What should participants do?', ['Mang nước và đăng ký miễn phí.', 'Mua vé ở nhà ga.', 'Đến lúc 12 giờ để xuất phát.'], ['Bring water and register for free.', 'Buy a ticket at the station.', 'Arrive at noon to start.'], 0, 'Tìm “Apportez de l’eau” và thông tin đăng ký.', 'Find “Apportez de l’eau” and the registration information.', 'Thông báo yêu cầu mang nước và đăng ký miễn phí tại trung tâm văn hóa.', 'The notice asks people to bring water and register for free at the cultural centre.')
        ]
      },
      {
        title: tr('Bài đọc 2 / 4 · Tờ thông tin dịch vụ', 'Reading 2 / 4 · Service information'),
        sources: [{
          label: tr('Thư viện Belle-Rive', 'Belle-Rive library'),
          paragraphs: ['BIBLIOTHÈQUE — Ouverte du mardi au samedi, de 10 h à 18 h.', 'Fermée lundi et dimanche. Les enfants peuvent emprunter trois livres. Retour des livres dans la boîte bleue, près de la porte.']
        }],
        questions: [
          question('Thư viện đóng cửa vào những ngày nào?', 'On which days is the library closed?', ['Thứ Hai và Chủ Nhật.', 'Thứ Ba và Thứ Bảy.', 'Thứ Tư và Thứ Sáu.'], ['Monday and Sunday.', 'Tuesday and Saturday.', 'Wednesday and Friday.'], 0, 'Tìm câu bắt đầu bằng “Fermée”.', 'Find the sentence beginning “Fermée”.', 'Thông báo ghi “Fermée lundi et dimanche.”', 'The notice says “Fermée lundi et dimanche.”'),
          question('Trẻ em có thể mượn bao nhiêu quyển sách?', 'How many books may children borrow?', ['Một quyển.', 'Ba quyển.', 'Năm quyển.'], ['One.', 'Three.', 'Five.'], 1, 'Tìm câu có từ “enfants”.', 'Find the sentence with “enfants”.', 'Thông báo ghi trẻ em có thể mượn ba quyển.', 'The notice says children may borrow three books.')
        ]
      },
      {
        title: tr('Bài đọc 3 / 4 · Thư cá nhân và bằng chứng', 'Reading 3 / 4 · Personal message and evidence'),
        sources: [{
          label: tr('Tin nhắn của Camille', 'Message from Camille'),
          paragraphs: ['Salut Linh, merci pour ton invitation ! Je ne peux pas venir samedi parce que je travaille jusqu’à 18 h.', 'Je suis libre dimanche après-midi. On peut prendre un café près de la mairie. À bientôt, Camille.']
        }],
        questions: [
          question('Camille có thể đến vào thứ Bảy không?', 'Can Camille come on Saturday?', ['Đúng.', 'Sai.'], ['True.', 'False.'], 1, 'Tìm câu có “Je ne peux pas venir”.', 'Look for “Je ne peux pas venir”.', 'Camille nói không thể đến thứ Bảy vì phải làm việc đến 18 giờ.', 'Camille says she cannot come Saturday because she works until 6 p.m.'),
          question('Câu nào trong tin nhắn giải thích câu trả lời trên?', 'Which sentence in the message supports that answer?', ['“Merci pour ton invitation !”', '“Je ne peux pas venir samedi parce que je travaille jusqu’à 18 h.”', '“On peut prendre un café près de la mairie.”'], ['“Merci pour ton invitation !”', '“Je ne peux pas venir samedi parce que je travaille jusqu’à 18 h.”', '“On peut prendre un café près de la mairie.”'], 1, 'Chọn câu nêu rõ thời gian Camille không thể đến và lý do.', 'Choose the sentence that gives the time Camille cannot come and the reason.', 'Câu thứ hai nói rõ Camille làm việc đến 18 h nên không thể đến thứ Bảy.', 'The second sentence says Camille works until 18 h, so she cannot come Saturday.')
        ]
      },
      {
        title: tr('Bài đọc 4 / 4 · Bài đăng trên diễn đàn', 'Reading 4 / 4 · Forum post'),
        sources: [{
          label: tr('Diễn đàn “Ma ville”', '“My town” forum'),
          paragraphs: ['LÉO — Hier, j’ai visité le musée avec ma sœur. Il était petit, mais très intéressant.', 'J’ai préféré la salle des photos parce que les images racontent l’histoire du quartier. Nous sommes rentrés à pied et nous avons acheté une glace.']
        }],
        questions: [
          question('Léo đã đến thăm nơi nào?', 'What place did Léo visit?', ['Bảo tàng.', 'Thư viện.', 'Nhà hát.'], ['A museum.', 'A library.', 'A theatre.'], 0, 'Tìm động từ “j’ai visité”.', 'Find the verb “j’ai visité”.', 'Léo viết: “j’ai visité le musée”.', 'Léo writes: “j’ai visité le musée”.'),
          question('Vì sao Léo thích phòng ảnh?', 'Why did Léo like the photo room?', ['Vì phòng rất rộng.', 'Vì ảnh kể về lịch sử khu phố.', 'Vì ở đó có kem.'], ['Because it was very large.', 'Because the pictures tell the neighbourhood’s history.', 'Because there was ice cream there.'], 1, 'Tìm cụm “parce que”.', 'Look for “parce que”.', 'Léo thích phòng ảnh vì các bức ảnh kể về lịch sử khu phố.', 'Léo liked the photo room because the pictures tell the neighbourhood’s history.')
        ]
      }
    ],
    writingTitle: tr('Bài tổng ôn · Viết', 'Final review · Writing'),
    writingIntro: tr('Hai nhiệm vụ viết độc lập. Mỗi bài cần ít nhất 60 từ theo hướng dẫn DELF A2 hiện hành. Bạn tự xem lại theo bảng tiêu chí; trò chơi không tự chấm chất lượng ngôn ngữ.', 'Two independent writing tasks. Each response should have at least 60 words, following current DELF A2 guidance. Use the checklist to review your work; the game does not automatically grade language quality.'),
    writingTasks: [
      {
        title: tr('Bài viết 1 · Kể và nêu cảm nhận', 'Writing 1 · Describe and give your opinion'),
        prompt: tr('Viết ít nhất 60 từ cho một diễn đàn về một chuyến đi chơi hoặc sự kiện gần đây. Kể bạn đã làm gì, mô tả thời tiết hoặc nơi chốn, nói bạn thích/không thích điều gì và giải thích vì sao.', 'Write at least 60 words for a forum about a recent outing or event. Say what you did, describe the weather or place, explain what you liked or disliked, and give a reason.'),
        review: [
          tr('Bài viết đúng chủ đề và có ít nhất 60 từ.', 'The response matches the topic and has at least 60 words.'),
          tr('Các ý có mở đầu, trình tự và kết thúc dễ theo dõi.', 'The response has a clear opening, sequence, and ending.'),
          tr('Mình đã nêu cảm nhận và giải thích bằng parce que hoặc từ nối khác.', 'I gave an opinion and explained it with parce que or another connector.'),
          tr('Mình đã kiểm tra động từ, giống/số và dấu câu quen thuộc.', 'I checked familiar verbs, gender/number agreement, and punctuation.')
        ],
        phrases: [
          ['Le week-end dernier…', 'Cuối tuần trước…', 'Last weekend…'],
          ['Il faisait…', 'Thời tiết lúc đó…', 'The weather was…'],
          ['J’ai préféré… parce que…', 'Mình thích… hơn vì…', 'I preferred… because…'],
          ['C’était…', 'Điều đó đã…', 'It was…']
        ],
        sample: 'Le week-end dernier, je suis allé à la fête de mon quartier avec ma sœur. Il faisait beau et la place était pleine de monde. Nous avons écouté de la musique, puis nous avons mangé avec nos voisins. J’ai préféré le concert parce que les chansons étaient très joyeuses. Je n’ai pas aimé attendre longtemps pour acheter une boisson. Malgré cela, j’ai passé une excellente soirée et je veux revenir l’année prochaine.'
      },
      {
        title: tr('Bài viết 2 · Trả lời một người bạn', 'Writing 2 · Reply to a friend'),
        prompt: tr('Viết ít nhất 60 từ cho Camille để cảm ơn lời mời. Xin lỗi vì bạn không thể đến vào thứ Bảy, giải thích lý do đơn giản và đề xuất một ngày/hoạt động khác. Dùng cách xưng hô thân mật và lời chào/kết thư phù hợp.', 'Write at least 60 words to Camille to thank them for the invitation. Apologize for not being able to come on Saturday, give a simple reason, and suggest another day or activity. Use a friendly register and suitable greeting and closing.'),
        review: [
          tr('Mình đã cảm ơn, xin lỗi và đề xuất phương án khác.', 'I thanked, apologized, and suggested an alternative.'),
          tr('Bài viết có ít nhất 60 từ và trả lời đúng người nhận.', 'The response addresses the recipient and has at least 60 words.'),
          tr('Mình đã dùng lời chào/kết thư và tu/vous phù hợp.', 'I used a suitable greeting, closing, and tu/vous register.'),
          tr('Mình đã nối ý và kiểm tra chính tả, động từ.', 'I connected ideas and checked spelling and verbs.')
        ],
        phrases: [
          ['Merci pour ton invitation.', 'Cảm ơn lời mời của bạn.', 'Thanks for your invitation.'],
          ['Je suis désolé(e), mais…', 'Mình xin lỗi, nhưng…', 'I’m sorry, but…'],
          ['Est-ce qu’on peut… ?', 'Chúng ta có thể… không?', 'Could we…?'],
          ['À bientôt !', 'Hẹn gặp lại!', 'See you soon!']
        ],
        sample: 'Salut Camille ! Merci beaucoup pour ton invitation à la fête samedi. Je suis désolée, mais je ne peux pas venir parce que je travaille toute la journée. Je suis libre dimanche après-midi. Est-ce qu’on peut se retrouver au café près de la mairie ? Nous pourrons parler et prendre un goûter. J’espère que tu es libre. Merci encore et à bientôt ! Linh.'
      }
    ]
  };

  window.DELF_A2_CONTENT = { episodes, review };
})();
