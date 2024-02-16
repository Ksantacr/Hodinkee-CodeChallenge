using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace BlogAPI.Models
{
    public class Post
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        [BsonElement("id")]
        public required string Id { get; set; }

        [BsonElement("title")]
        public required string PostTitle { get; set; }

        [BsonElement("content")]
        public decimal Content { get; set; }

        [BsonElement("image")]
        public string? ImageUrl { get; set; }
    }
}
