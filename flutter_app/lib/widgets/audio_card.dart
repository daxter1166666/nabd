import 'package:flutter/material.dart';
import 'package:lucide_icons/lucide_icons.dart';
import '../models/voice_donation.dart';

class AudioCard extends StatefulWidget {
  final VoiceDonation donation;
  final VoidCallback onTogglePlay;
  final VoidCallback onToggleLike;

  const AudioCard({
    Key? key,
    required this.donation,
    required this.onTogglePlay,
    required this.onToggleLike,
  }) : super(key: key);

  @override
  State<AudioCard> createState() => _AudioCardState();
}

class _AudioCardState extends State<AudioCard> {
  @override
  Widget build(BuildContext context) {
    final msg = widget.donation;

    return Container(
      margin: const EdgeInsets.only(bottom: 14),
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: const Color(0xFF1C1917),
        border: Border.all(color: const Color(0xFF292524)),
        borderRadius: BorderRadius.circular(16),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          // Header: Donor Info
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Row(
                children: [
                  CircleAvatar(
                    backgroundColor: const Color(0xFF9F1239),
                    radius: 18,
                    child: Text(
                      msg.donorName[0],
                      style: const TextStyle(
                        color: Colors.white,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                  ),
                  const SizedBox(width: 10),
                  Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        msg.donorName,
                        style: const TextStyle(
                          fontWeight: FontWeight.bold,
                          fontSize: 14,
                          color: Colors.white,
                        ),
                      ),
                      Text(
                        msg.date,
                        style: const TextStyle(
                          fontSize: 11,
                          color: Color(0xFFA8A29E),
                        ),
                      ),
                    ],
                  ),
                ],
              ),
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                decoration: BoxDecoration(
                  color: const Color(0xFF881337).withOpacity(0.3),
                  borderRadius: BorderRadius.circular(8),
                  border: Border.all(color: const Color(0xFF9F1239)),
                ),
                child: Text(
                  msg.category,
                  style: const TextStyle(fontSize: 11, color: Color(0xFFFB7185)),
                ),
              ),
            ],
          ),
          const SizedBox(height: 12),

          // Audio Player Box
          Container(
            padding: const EdgeInsets.all(12),
            decoration: BoxDecoration(
              color: const Color(0xFF0C0A09),
              borderRadius: BorderRadius.circular(12),
            ),
            child: Row(
              children: [
                IconButton(
                  onPressed: widget.onTogglePlay,
                  icon: Icon(
                    msg.isPlaying
                        ? LucideIcons.pauseCircle
                        : LucideIcons.playCircle,
                    color: const Color(0xFFFB7185),
                    size: 32,
                  ),
                ),
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          Text(
                            msg.isPlaying ? 'جاري التشغيل...' : 'رسالة صوتية',
                            style: const TextStyle(
                              fontSize: 12,
                              fontWeight: FontWeight.bold,
                              color: Colors.white,
                            ),
                          ),
                          Text(
                            msg.duration,
                            style: const TextStyle(fontSize: 11, color: Colors.grey),
                          ),
                        ],
                      ),
                      const SizedBox(height: 6),
                      // Waveform Animation
                      Row(
                        children: List.generate(
                          24,
                          (index) => Expanded(
                            child: AnimatedContainer(
                              duration: const Duration(milliseconds: 300),
                              margin: const EdgeInsets.symmetric(horizontal: 1),
                              height: msg.isPlaying ? (index % 5 + 2) * 5.0 : (index % 4 + 1) * 3.0,
                              decoration: BoxDecoration(
                                color: msg.isPlaying
                                    ? const Color(0xFFFB7185)
                                    : const Color(0xFF44403C),
                                borderRadius: BorderRadius.circular(2),
                              ),
                            ),
                          ),
                        ),
                      ),
                    ],
                  ),
                ),
              ],
            ),
          ),
          const SizedBox(height: 10),

          // Transcription
          Text(
            msg.transcription,
            style: const TextStyle(fontSize: 13, color: Color(0xFFD6D3D1)),
          ),
          const SizedBox(height: 12),

          // Interaction Bar
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              InkWell(
                onTap: widget.onToggleLike,
                borderRadius: BorderRadius.circular(8),
                child: Padding(
                  padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 4),
                  child: Row(
                    children: [
                      Icon(
                        LucideIcons.heart,
                        size: 18,
                        color: msg.isLiked ? const Color(0xFFF43F5E) : Colors.grey,
                      ),
                      const SizedBox(width: 6),
                      Text(
                        '${msg.likes}',
                        style: TextStyle(
                          color: msg.isLiked ? const Color(0xFFF43F5E) : Colors.grey,
                          fontSize: 12,
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                    ],
                  ),
                ),
              ),
              const Row(
                children: [
                  Icon(LucideIcons.share2, size: 16, color: Colors.grey),
                  SizedBox(width: 14),
                  Icon(LucideIcons.bookmark, size: 16, color: Colors.grey),
                ],
              ),
            ],
          ),
        ],
      ),
    );
  }
}
