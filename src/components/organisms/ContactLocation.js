"use client";

export default function ContactLocation() {
  return (
    <div>
      <h3 className="text-2xl font-bold mb-4">Our Studio Location</h3>
      <div className="aspect-video overflow-hidden rounded-xl border border-border">
        <iframe
          className="w-full h-full"
          loading="lazy"
          allowFullScreen
          referrerPolicy="no-referrer-when-downgrade"
          src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3654.076307431891!2d74.02129007533352!3d23.673228978723145!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMjPCsDQwJzIzLjYiTiA3NMKwMDEnMjUuOSJF!5e0!3m2!1sen!2skw!4v1775980585935!5m2!1sen!2skw"
          style={{ border: 0 }}
        />
      </div>
    </div>
  );
}
