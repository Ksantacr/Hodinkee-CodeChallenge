using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using BlogAPI.Models;
using BlogAPI.Services;

namespace BlogAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PostController : ControllerBase
    {
        private readonly PostService _postService;

        public PostController(PostService postService)
        {
            _postService = postService;
        }
        // GET: api/Post
        [HttpGet]
        public async Task<ActionResult<List<Post>>> Get()
        {
            return await _postService.Get();
        }

        // GET: api/Post/5
        [HttpGet("{id}", Name = "Get")]
        public async Task<ActionResult<Post>> Get(string id)
        {
            var s = await _postService.Get(id);
            if(s == null)
            {
                return NotFound();
            }

            return s;
        }

        // POST: api/Post
        [HttpPost]
        public async Task<ActionResult<Post>> Create([FromBody] Post s)
        {
            await _postService.Create(s);
            return CreatedAtRoute("Get", new { id = s.Id.ToString() }, s);

        }

        // PUT: api/Post/5
        [HttpPut("{id}")]
        public  async Task<ActionResult<Post>> Put(string id, [FromBody] Post su)
        {
            var s = await _postService.Get(id);
            if (s == null)
            {
                return NotFound();
            }
            su.Id = s.Id;

            await _postService.Update(id, su);
            return CreatedAtRoute("Get", new { id = su.Id.ToString() }, su);
        }

        // DELETE: api/Post/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Post>> Delete(string id)
        {
            var s = await _postService.Get(id);
            if (s == null)
            {
                return NotFound();
            }

            return NoContent();

        }
    }
}
