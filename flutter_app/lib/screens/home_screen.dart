import 'package:flutter/material.dart';
import 'package:lucide_icons/lucide_icons.dart';
import '../models/voice_donation.dart';
import '../widgets/audio_card.dart';
import 'campaigns_screen.dart';
import 'profile_screen.dart';

class HomeScreen extends StatefulWidget {
  final Function(String) onChangeLanguage;

  const HomeScreen({Key? key, required this.onChangeLanguage}) : super(key: key);

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  int _currentIndex = 0;

  final List<VoiceDonation> _donations = [
    VoiceDonation(
      id: '1',
      donorName: 'سارة الأحمد',
      category: 'مرضى السرطان',
      duration: '0:45',
      likes: 24,
      transcription: 'رسالة أمل لكل بطل وبطلة يحاربون بشجاعة، أنتم أقوى مما تتخيلون والنصر قريب بإذن الله.',
      campaign: 'أبطال التحدي',
      date: 'منذ ساعتين',
    ),
    VoiceDonation(
      id: '2',
      donorName: 'د. خالد العمري',
      category: 'كبار السن',
      duration: '1:10',
      likes: 42,
      isLiked: true,
      transcription: 'إلى بركة أيامنا وأجدادنا الكرام، نحبكم وندعو لكم بالصحة والعافية دائماً.',
      campaign: 'دفء وفاء',
      date: 'منذ 5 ساعات',
    ),
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: const Color(0xFF0C0A09),
        elevation: 0,
        title: Row(
          children: [
            Container(
              width: 36,
              height: 36,
              decoration: BoxDecoration(
                color: const Color(0xFF881337),
                borderRadius: BorderRadius.circular(10),
              ),
              child: const Icon(LucideIcons.heartHandshake, color: Colors.white, size: 20),
            ),
            const SizedBox(width: 10),
            Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: const [
                Text(
                  'نبض الأمل',
                  style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold, color: Colors.white),
                ),
                Text(
                  'منصة التبرعات والرسائل الصوتية',
                  style: TextStyle(fontSize: 10, color: Color(0xFFA8A29E)),
                ),
              ],
            ),
          ],
        ),
        actions: [
          PopupMenuButton<String>(
            icon: const Icon(LucideIcons.globe, size: 20, color: Colors.white),
            onSelected: widget.onChangeLanguage,
            itemBuilder: (context) => [
              const PopupMenuItem(value: 'ar', child: Text('🇸🇦 العربية')),
              const PopupMenuItem(value: 'en', child: Text('🇬🇧 English')),
              const PopupMenuItem(value: 'fr', child: Text('🇫🇷 Français')),
              const PopupMenuItem(value: 'tr', child: Text('🇹🇷 Türkçe')),
            ],
          ),
        ],
      ),
      body: IndexedStack(
        index: _currentIndex,
        children: [
          _buildFeedView(),
          const CampaignsScreen(),
          const ProfileScreen(),
        ],
      ),
      bottomNavigationBar: BottomNavigationBar(
        currentIndex: _currentIndex,
        onTap: (idx) => setState(() => _currentIndex = idx),
        backgroundColor: const Color(0xFF1C1917),
        selectedItemColor: const Color(0xFFFB7185),
        unselectedItemColor: const Color(0xFFA8A29E),
        items: const [
          BottomNavigationBarItem(icon: Icon(LucideIcons.home), label: 'الرئيسية'),
          BottomNavigationBarItem(icon: Icon(LucideIcons.layers), label: 'الفعاليات'),
          BottomNavigationBarItem(icon: Icon(LucideIcons.user), label: 'حسابي'),
        ],
      ),
      floatingActionButton: FloatingActionButton.extended(
        onPressed: () => _showRecordModal(context),
        backgroundColor: const Color(0xFF9F1239),
        icon: const Icon(LucideIcons.mic, color: Colors.white),
        label: const Text(
          'تبرع بصوتك',
          style: TextStyle(color: Colors.white, fontWeight: FontWeight.bold),
        ),
      ),
    );
  }

  Widget _buildFeedView() {
    return ListView(
      padding: const EdgeInsets.all(16),
      children: [
        Container(
          padding: const EdgeInsets.all(16),
          decoration: BoxDecoration(
            gradient: const LinearGradient(
              colors: [Color(0xFF881337), Color(0xFF4C0519)],
            ),
            borderRadius: BorderRadius.circular(16),
          ),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: const [
              Text(
                'صوتك يمنح الشفاء والأمل ❤️',
                style: TextStyle(fontWeight: FontWeight.bold, fontSize: 16, color: Colors.white),
              ),
              SizedBox(height: 4),
              Text(
                'شارِك برسالة صوتية دافئة لمساندة مرضى السرطان وكبار السن ورسم البسمة.',
                style: TextStyle(fontSize: 12, color: Colors.white70),
              ),
            ],
          ),
        ),
        const SizedBox(height: 20),
        const Text(
          'التبرعات الصوتية الأخيرة',
          style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold, color: Colors.white),
        ),
        const SizedBox(height: 12),
        ..._donations.map((msg) => AudioCard(
          donation: msg,
          onTogglePlay: () {
            setState(() {
              msg.isPlaying = !msg.isPlaying;
            });
          },
          onToggleLike: () {
            setState(() {
              msg.isLiked = !msg.isLiked;
              msg.likes += msg.isLiked ? 1 : -1;
            });
          },
        )).toList(),
      ],
    );
  }

  void _showRecordModal(BuildContext context) {
    showModalBottomSheet(
      context: context,
      backgroundColor: const Color(0xFF1C1917),
      shape: const RoundedRectangleBorder(
        borderRadius: BorderRadius.vertical(top: Radius.circular(24)),
      ),
      builder: (context) {
        return Padding(
          padding: const EdgeInsets.all(24.0),
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              Container(
                width: 40,
                height: 4,
                decoration: BoxDecoration(
                  color: Colors.grey[700],
                  borderRadius: BorderRadius.circular(2),
                ),
              ),
              const SizedBox(height: 20),
              const Text(
                'تسجيل تبرع صوتي جديد',
                style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold, color: Colors.white),
              ),
              const SizedBox(height: 8),
              const Text(
                'انطق بكلمات دافئة تلامس القلوب وتمنح الأمل للمحتاجين',
                style: TextStyle(fontSize: 12, color: Color(0xFFA8A29E)),
              ),
              const SizedBox(height: 30),
              Container(
                width: 80,
                height: 80,
                decoration: BoxDecoration(
                  color: const Color(0xFF9F1239),
                  shape: BoxShape.circle,
                  boxShadow: [
                    BoxShadow(
                      color: const Color(0xFF9F1239).withOpacity(0.5),
                      blurRadius: 20,
                      spreadRadius: 5,
                    ),
                  ],
                ),
                child: const Icon(LucideIcons.mic, color: Colors.white, size: 36),
              ),
              const SizedBox(height: 20),
              const Text(
                'اضغط لبدء التسجيل',
                style: TextStyle(fontSize: 12, color: Colors.grey),
              ),
              const SizedBox(height: 30),
            ],
          ),
        );
      },
    );
  }
}
