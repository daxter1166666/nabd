class VoiceDonation {
  final String id;
  final String donorName;
  final String category;
  final String duration;
  int likes;
  bool isPlaying;
  bool isLiked;
  final String transcription;
  final String campaign;
  final String date;

  VoiceDonation({
    required this.id,
    required this.donorName,
    required this.category,
    required this.duration,
    required this.likes,
    this.isPlaying = false,
    this.isLiked = false,
    required this.transcription,
    required this.campaign,
    required this.date,
  });
}
