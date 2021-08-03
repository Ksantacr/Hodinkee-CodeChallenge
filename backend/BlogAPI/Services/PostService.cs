using Microsoft.Extensions.Configuration;
using MongoDB.Driver;
using BlogAPI.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace BlogAPI.Services
{
    public class PostService
    {
        private readonly IMongoCollection<Post> _post;

        public PostService(IConfiguration config)
        {
            // Connects to MongoDB.
            var client = new MongoClient(config.GetConnectionString("HodinkeeDb"));
            // Gets the supplementDB.
            var database = client.GetDatabase("HodinkeeDb");
            //Fetches the supplement collection.
            _post = database.GetCollection<Post>("Posts");
        }

        public async Task<List<Post>> Get()
        {
            //Gets all posts. 
            return await _post.Find(s => true).ToListAsync();
        }

        public async Task<Post> Get(string id)
        {
            //Get a single post. 
            return await _post.Find(s => s.Id == id).FirstOrDefaultAsync();
        }

        public async Task<Post> Create(Post s)
        {
            //Create a post.
            await _post.InsertOneAsync(s);
            return s;
        }

        public async Task<Post> Update(string id, Post s)
        {
            // Updates and existing post. 
             await _post.ReplaceOneAsync(su => su.Id == id, s);
             return s;
        }


        public async Task Remove(string id)
        {
            //Removes a post.
            await _post.DeleteOneAsync(su => su.Id == id);
        }

    }
}
