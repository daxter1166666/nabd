import 'package:flutter/material.dart';
import 'package:lucide_icons/lucide_icons.dart';

class CampaignsScreen extends StatelessWidget {
  const CampaignsScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final campaigns = [
      {
        'title': 'أبطال التحدي - مرضى السرطان',
        'desc': 'رسائل صوتية تشجيعية تمنح الأمل والقوة لمقاومي السرطان.',
        'donations': 142,
        'tag': 'الأكثر نشاطاً',
        'color': const Color(0xFF9F1239),
      },
      {
        'title': 'دفء وفاء - دور رعاية كبار السن',
        'desc': 'دعوات وحكايات دافئة تفرّح قلوب أجدادنا وجداتنا.',
        'donations': 89,
        'tag': 'جديد',
        'color': const Color(0xFFD97706),
      },
      {
        'title': 'صوت الشفاء - دور الأيتام',
        'desc': 'كلمات ملهمة وقصص صوتية داعمة للأطفال.',
        'donations': 67,
        'tag': 'مستمر',
        'color': const Color(0xFF2563EB),
      },
    ];

    return ListView(
      padding: const EdgeInsets.all(16),
      children: [
        const Text(
          'حملات التبرع الصوتي والهاشتاغات',
          style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold, color: Colors.white),
        ),
        const SizedBox(height: 12),
        ...campaigns.map((c) => Container(
          margin: const EdgeInsets.only(bottom: 12),
          padding: const EdgeInsets.all(16),
          decoration: BoxDecoration(
            color: const Color(0xFF1C1917),
            borderRadius: BorderRadius.circular(16),
            border: Border.all(color: const Color(0xFF292524)),
          ),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Expanded(
                    child: Text(
                      c['title'] as String,
                      style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 15, color: Colors.white),
                    ),
                  ),
                  Container(
                    padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
                    decoration: BoxDecoration(
                      color: (c['color'] as Color).withOpacity(0.2),
                      borderRadius: BorderRadius.circular(6),
                    ),
                    child: Text(
                      c['tag'] as String,
                      style: TextStyle(fontSize: 10, color: c['color'] as Color, fontWeight: FontWeight.bold),
                    ),
                  ),
                ],
              ),
              const SizedBox(height: 6),
              Text(
                c['desc'] as String,
                style: const TextStyle(fontSize: 12, color: Color(0xFFA8A29E)),
              ),
              const SizedBox(height: 12),
              Row(
                children: [
                  const Icon(LucideIcons.mic, size: 14, color: Color(0xFFFB7185)),
                  const SizedBox(width: 4),
                  Text(
                    '${c['donations']} رسالة صوتية متبرعة',
                    style: const TextStyle(fontSize: 11, color: Color(0xFFFB7185), fontWeight: FontWeight.bold),
                  ),
                ],
              ),
            ],
          ),
        )).toList(),
      ],
    );
  }
}
